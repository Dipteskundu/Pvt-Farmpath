import React, { useState, useEffect } from 'react';
import { tr } from '@/lib/localize';
import {
  ArrowLeft,
  Sprout,
  Calendar,
  Clock,
  Droplets,
  CloudRain,
  FlaskConical,
  ShieldCheck,
  Info,
  MapPin,
  Coins,
  CheckCircle2,
  Layers,
  AlertCircle,
  TrendingUp,
  PackageCheck,
  Thermometer,
  Database,
  ChevronRight,
} from '@/components/icons';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { useToast } from '@/components/ui/Toast';
import { getCropDetail } from '@/lib/farmerApi';
import {
  CropDetail as CropDetailData,
} from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { MetricTile, RangeBar, EmptyHint } from './recommendation-ui';

interface CropDetailProps {
  cropId: string;
  onBack?: () => void;
}

/** Renders a value or an honest em-dash when the source data has none. */
const Value: React.FC<{ value: React.ReactNode }> = ({ value }) =>
  value === null || value === undefined || value === '' ? (
    <span className="text-slate-300 dark:text-[#3a3a3a] font-bold">—</span>
  ) : (
    <>{value}</>
  );

/* ------------------------------------------------------------------ */
/* Section primitives                                                  */
/* ------------------------------------------------------------------ */

const SectionShell: React.FC<{
  id?: string;
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
}> = ({ id, icon, title, subtitle, badge, children }) => (
  <Card id={id} className="scroll-mt-16">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100 dark:border-[#1a1a1a]">
      <div>
        <h3 className="text-[15px] font-semibold text-slate-900 dark:text-[#f0f0f0] tracking-tight flex items-center gap-2.5">
          <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300 inline-flex">
            {icon}
          </span>
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-slate-500 dark:text-[#a0a0a0] mt-1 sm:ml-[38px]">
            {subtitle}
          </p>
        )}
      </div>
      {badge && <div className="flex items-center gap-2">{badge}</div>}
    </div>
    {children}
  </Card>
);

/** Vertical milestone timeline row (calendar + fertilizer schedule). */
const TimelineStep: React.FC<{
  index: number;
  icon?: React.ReactNode;
  label: string;
  children?: React.ReactNode;
}> = ({ index, icon, label, children }) => (
  <div className="relative">
    <span className="absolute -left-8 top-0.5 w-6 h-6 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white text-[11px] font-bold flex items-center justify-center ring-4 ring-white dark:ring-[#0a0a0a]">
      {icon ?? index}
    </span>
    <p className="text-sm font-semibold text-slate-800 dark:text-[#e0e0e0] leading-6">
      {label}
    </p>
    {children && <div className="mt-1.5">{children}</div>}
  </div>
);

const Timeline: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative pl-8 space-y-5 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-px before:bg-slate-200 dark:before:bg-[#222222]">
    {children}
  </div>
);

export const CropDetail: React.FC<CropDetailProps> = ({ cropId, onBack }) => {
  const { showToast } = useToast();
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<CropDetailData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await getCropDetail(cropId);
        if (cancelled) return;
        if (res.success) {
          setDetail(res.data);
        } else {
          setError(tr('Crop details could not be loaded'));
        }
      } catch {
        if (!cancelled) {
          setError(tr('Crop details could not be loaded'));
          showToast('error', tr('Crop details could not be loaded'));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [cropId, showToast]);

  const t = (en: string, bn: string): string => (language === 'bn' ? bn : en);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-44" />
        <div className="h-44 bg-white dark:bg-[#0a0a0a] rounded-2xl border border-slate-200 dark:border-[#222222] p-6">
          <Skeleton className="h-12 w-12 rounded-xl mb-4" />
          <Skeleton className="h-7 w-1/3 mb-2" />
          <Skeleton className="h-4 w-1/4 mb-4" />
          <Skeleton className="h-8 w-full max-w-md" />
        </div>
        <div className="h-10 w-full max-w-md rounded-lg bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-[#222222]" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-24 rounded-2xl bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-[#222222] p-4">
              <Skeleton className="h-6 w-6 rounded-lg mb-2" />
              <Skeleton className="h-3 w-2/3 mb-2" />
              <Skeleton className="h-5 w-1/2" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[0, 1].map((i) => (
            <div key={i} className="h-64 rounded-xl bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-[#222222] p-5">
              <Skeleton className="h-5 w-1/3 mb-4" />
              <Skeleton className="h-40 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !detail) {
    return (
      <Card className="p-8 text-center">
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
        <p className="text-slate-800 dark:text-[#e0e0e0] font-semibold mb-1">
          {t('Crop details unavailable', 'ফসলের বিস্তারিত তথ্য পাওয়া যায়নি')}
        </p>
        <p className="text-xs text-slate-500 dark:text-[#a0a0a0] mb-4">
          {error || t('Please try again.', 'অনুগ্রহ করে আবার চেষ্টা করুন।')}
        </p>
        {onBack && (
          <Button variant="outline" size="sm" icon={ArrowLeft} onClick={onBack}>
            {t('Back to Recommendations', 'পরামর্শে ফিরে যান')}
          </Button>
        )}
      </Card>
    );
  }

  const { identity, benchmarks, lifecycle, climateEnvelope, barcSuitability, fertilizerPlan, sources } = detail;

  const displayName =
    language === 'bn' && identity.banglaName && identity.banglaName !== identity.cropName
      ? identity.banglaName
      : tr(identity.cropName);

  const barcClass = barcSuitability?.suitability_class as string | undefined;
  const barcLevel = barcSuitability?.suitability_level as string | undefined;
  const barcOk = barcClass && barcLevel && barcLevel !== 'Unclassified' && barcLevel !== 'Unknown';

  /* Sticky section nav — only link to sections that will actually render */
  const navSections: Array<{ id: string; label: string }> = [
    { id: 'overview', label: t('Benchmarks', 'বেঞ্চমার্ক') },
    ...(lifecycle ? [{ id: 'calendar', label: t('Calendar', 'ক্যালেন্ডার') }] : []),
    ...(climateEnvelope ? [{ id: 'climate', label: t('Climate', 'জলবায়ু') }] : []),
    ...(barcSuitability ? [{ id: 'zoning', label: t('Zoning', 'জোনিং') }] : []),
    ...(fertilizerPlan ? [{ id: 'fertilizer', label: t('Fertilizer', 'সার') }] : []),
    ...(benchmarks.recommendedVarieties.length > 0 || benchmarks.pestVulnerabilities.length > 0
      ? [{ id: 'catalog', label: t('Catalog', 'ক্যাটালগ') }]
      : []),
  ];

  return (
    <div className="space-y-5">
      {/* Back navigation */}
      <div>
        <Button variant="ghost" size="sm" icon={ArrowLeft} onClick={onBack}>
          {t('Back to Recommendations', 'পরামর্শে ফিরে যান')}
        </Button>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-900 text-white p-6 shadow-lg">
        {/* Decorative glows */}
        <div className="pointer-events-none absolute -top-24 -right-16 w-72 h-72 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-10 w-64 h-64 rounded-full bg-teal-300/10 blur-3xl" />
        {/* Fine grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-5">
          <div className="flex items-start gap-4 min-w-0">
            {/* Crop medallion */}
            <div className="hidden sm:flex w-14 h-14 shrink-0 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm items-center justify-center shadow-inner">
              <Sprout className="w-7 h-7 text-emerald-200" />
            </div>

            <div className="min-w-0 space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-emerald-100 text-[11px] font-semibold uppercase tracking-wider">
                <Sprout className="w-3.5 h-3.5" />
                {t('Recommended Crop Profile', 'প্রস্তাবিত ফসলের প্রোফাইল')}
              </div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
                {displayName}
              </h1>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-emerald-100/80">
                {identity.banglaName && identity.banglaName !== identity.cropName && (
                  <span className="font-medium">{identity.banglaName}</span>
                )}
                {identity.scientificName && (
                  <span className="italic">{identity.scientificName}</span>
                )}
                {identity.canonicalName && identity.canonicalName !== identity.cropName && (
                  <span>
                    {t('Catalog name', 'ক্যাটালগ নাম')}: {identity.canonicalName}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1.5">
                {identity.category && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/10 border border-white/15 text-emerald-50 text-[11px] font-medium">
                    <Layers className="w-3 h-3" />
                    {tr(identity.category)}
                  </span>
                )}
                {identity.verifiedSeasons.map((season) => (
                  <span
                    key={season}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/10 border border-white/15 text-emerald-50 text-[11px] font-medium"
                  >
                    <Calendar className="w-3 h-3" />
                    {tr(season)}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Data source badge */}
          <div className="shrink-0 md:text-right">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-semibold text-emerald-50">
              <Database className="w-3 h-3" />
              {identity.inMasterCatalog
                ? t('National master catalog data', 'জাতীয় মাস্টার ক্যাটালগ তথ্য')
                : t('AI model catalog data', 'এআই মডেল ক্যাটালগ তথ্য')}
            </span>
            <p className="text-[11px] text-emerald-100/60 max-w-xs md:text-right mt-2 leading-relaxed">
              {t(
                'Benchmarks come from the national master crop catalog; lifecycle, climate, zoning, and fertilizer sections come from the AI agronomy service.',
                'বেঞ্চমার্ক জাতীয় মাস্টার ক্রপ ক্যাটালগ থেকে; জীবনচক্র, জলবায়ু, জোনিং ও সার বিভাগ এআই কৃষি সেবা থেকে আসে।'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ── Sticky section nav ───────────────────────────────────── */}
      <nav
        aria-label={t('Page sections', 'পৃষ্ঠার বিভাগ')}
        className="sticky top-0 z-20 flex items-center gap-1 overflow-x-auto rounded-xl border border-slate-200/80 dark:border-[#222222] bg-white/85 dark:bg-black/80 backdrop-blur-md px-2 py-1.5 shadow-xs"
      >
        {navSections.map((section, i) => (
          <React.Fragment key={section.id}>
            {i > 0 && <span className="w-px h-4 bg-slate-200 dark:bg-[#222222] shrink-0" aria-hidden="true" />}
            <button
              type="button"
              onClick={() => scrollTo(section.id)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-[#a0a0a0] hover:bg-emerald-50 hover:text-emerald-800 dark:hover:bg-[#1a1a1a] dark:hover:text-emerald-300 transition-colors whitespace-nowrap cursor-pointer"
            >
              {section.label}
              <ChevronRight className="w-3 h-3 opacity-40" />
            </button>
          </React.Fragment>
        ))}
      </nav>

      {/* ── Key benchmarks ───────────────────────────────────────── */}
      <SectionShell
        id="overview"
        icon={<TrendingUp />}
        title={t('Key Benchmarks', 'মূল বেঞ্চমার্ক')}
        subtitle={t('Verified agronomic and economic reference values', 'যাচাইকৃত কৃষি ও অর্থনৈতিক রেফারেন্স মান')}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <MetricTile
            icon={Clock}
            label={t('Maturity', 'পরিপক্বতা')}
            value={
              benchmarks.maturityPeriodDays != null
                ? `${benchmarks.maturityPeriodDays} ${t('days', 'দিন')}`
                : null
            }
          />
          <MetricTile
            icon={Sprout}
            label={t('Est. Yield / Acre', 'সম্ভাব্য ফলন / একর')}
            value={
              benchmarks.estimatedYieldKgPerAcre != null
                ? `${benchmarks.estimatedYieldKgPerAcre.toLocaleString()} ${tr('kg')}`
                : null
            }
          />
          <MetricTile
            icon={Coins}
            label={t('Benchmark Market Price', 'বেঞ্চমার্ক বাজারদর')}
            tone="amber"
            value={
              benchmarks.expectedMarketPricePerKg != null
                ? `৳${benchmarks.expectedMarketPricePerKg}/${tr('kg')}`
                : null
            }
          />
          <MetricTile
            icon={Droplets}
            label={t('Water Requirement', 'পানির প্রয়োজনীয়তা')}
            tone="indigo"
            value={
              benchmarks.waterRequirementMm != null
                ? `${benchmarks.waterRequirementMm} ${t('mm', 'মিমি')}`
                : null
            }
          />
          <MetricTile
            icon={FlaskConical}
            label={t('Optimal Soil pH', 'সর্বোত্তম মাটির পিএইচ')}
            value={benchmarks.optimalSoilPhRange || null}
          />
          <MetricTile
            icon={CloudRain}
            label={t('Rainfall Range', 'বৃষ্টিপাতের পরিসর')}
            tone="indigo"
            value={
              benchmarks.minRainfallMm != null && benchmarks.maxRainfallMm != null
                ? `${benchmarks.minRainfallMm.toLocaleString()} – ${benchmarks.maxRainfallMm.toLocaleString()} ${t('mm', 'মিমি')}`
                : null
            }
          />
        </div>

        {benchmarks.recommendedSeason && (
          <div className="mt-3 p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100 text-xs text-slate-700 dark:text-[#999999]">
            <span className="font-semibold text-emerald-800 dark:text-emerald-300">
              {t('Recommended Season', 'প্রস্তাবিত মৌসুম')}:{' '}
            </span>
            {tr(benchmarks.recommendedSeason)}
          </div>
        )}
      </SectionShell>

      {/* ── Growing calendar ─────────────────────────────────────── */}
      {lifecycle && (
        <SectionShell
          id="calendar"
          icon={<Calendar />}
          title={t('Growing Calendar', 'চাষাবাদের ক্যালেন্ডার')}
          subtitle={t('Phenological lifecycle windows from the SPAS crop dataset', 'SPAS ফসল ডেটাসেট থেকে জীবনচক্রের সময়সীমা')}
        >
          <Timeline>
            <TimelineStep
              index={1}
              icon={<Sprout className="w-3 h-3" />}
              label={t('Transplant / Sowing Window', 'রোপণ / বপনের সময়')}
            >
              <p className="text-base font-bold text-emerald-800 dark:text-emerald-300">
                <Value value={lifecycle.transplant_window ? tr(lifecycle.transplant_window) : null} />
              </p>
            </TimelineStep>
            <TimelineStep
              index={2}
              icon={<TrendingUp className="w-3 h-3" />}
              label={t('Growth Window', 'বৃদ্ধির সময়')}
            >
              <p className="text-base font-bold text-slate-800 dark:text-[#e0e0e0]">
                <Value value={lifecycle.growth_window ? tr(lifecycle.growth_window) : null} />
              </p>
            </TimelineStep>
            <TimelineStep
              index={3}
              icon={<PackageCheck className="w-3 h-3" />}
              label={t('Harvest Window', 'ফসল তোলার সময়')}
            >
              <p className="text-base font-bold text-slate-800 dark:text-[#e0e0e0]">
                <Value value={lifecycle.harvest_window ? tr(lifecycle.harvest_window) : null} />
              </p>
            </TimelineStep>
          </Timeline>
        </SectionShell>
      )}

      {/* ── Climate requirements ─────────────────────────────────── */}
      {climateEnvelope && (
        <SectionShell
          id="climate"
          icon={<Thermometer />}
          title={t('Climate Requirements', 'জলবায়ুর প্রয়োজনীয়তা')}
          subtitle={t('Observed temperature and humidity envelope', 'পর্যবেক্ষিত তাপমাত্রা ও আর্দ্রতার পরিসর')}
        >
          <div className="space-y-6">
            <RangeBar
              label={t('Temperature — tolerance band with optimal average', 'তাপমাত্রা — সহনসীমা ও সর্বোত্তম গড়')}
              min={climateEnvelope.min_temp_c}
              max={climateEnvelope.max_temp_c}
              optimal={climateEnvelope.optimal_avg_temp_c}
              scaleMin={0}
              scaleMax={50}
              unit="°C"
              format={(n) => `${Math.round(n * 10) / 10}`}
            />
            <RangeBar
              label={t('Relative humidity — tolerance band with optimal average', 'আপেক্ষিক আর্দ্রতা — সহনসীমা ও সর্বোত্তম গড়')}
              min={climateEnvelope.min_rh_pct}
              max={climateEnvelope.max_rh_pct}
              optimal={climateEnvelope.optimal_avg_humidity_pct}
              scaleMin={0}
              scaleMax={100}
              unit="%"
            />
          </div>
        </SectionShell>
      )}

      {/* ── BARC zoning ──────────────────────────────────────────── */}
      {barcSuitability && (
        <SectionShell
          id="zoning"
          icon={<MapPin />}
          title={t('BARC Crop Zoning Suitability', 'বার্ক ক্রপ জোনিং উপযুক্ততা')}
          subtitle={
            barcSuitability.district
              ? `${t('Official assessment for', 'সরকারি মূল্যায়ন —')} ${barcSuitability.district}`
              : t('Official BARC National Crop Zoning assessment', 'সরকারি বার্ক জাতীয় ক্রপ জোনিং মূল্যায়ন')
          }
        >
          {barcOk ? (
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/70 dark:bg-emerald-500/10 dark:border-emerald-500/25">
              <div className="w-11 h-11 shrink-0 rounded-xl bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-base font-bold text-emerald-900 dark:text-emerald-200">
                  {tr(barcClass || '')}
                </p>
                {barcSuitability.details && (
                  <p className="text-xs text-emerald-800/80 dark:text-emerald-200/70 mt-0.5 leading-relaxed">
                    {tr(String(barcSuitability.details))}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <EmptyHint
              text={
                barcSuitability.details
                  ? tr(String(barcSuitability.details))
                  : t(
                      'This crop is not tracked in official BARC Crop Zoning records for your district yet.',
                      'এই ফসল এখনো সরকারি বার্ক ক্রপ জোনিং রেকর্ডে আপনার জেলার জন্য অন্তর্ভুক্ত নয়।'
                    )
              }
            />
          )}
        </SectionShell>
      )}

      {/* ── FRG-2024 fertilizer plan ─────────────────────────────── */}
      {fertilizerPlan && (
        <SectionShell
          id="fertilizer"
          icon={<FlaskConical />}
          title={t('BARC FRG-2024 Fertilizer Plan', 'বার্ক এফআরজি-২০২৪ সার পরিকল্পনা')}
          subtitle={
            fertilizerPlan.has_frg_guidance
              ? t('Official nutrient rates scaled to your registered farm area', 'আপনার নিবন্ধিত জমির আকার অনুযায়ী সরকারি পুষ্টি হার')
              : undefined
          }
          badge={
            fertilizerPlan.has_frg_guidance ? (
              <Badge variant="success" size="sm">
                {t('Official FRG rates', 'সরকারি এফআরজি হার')}
              </Badge>
            ) : undefined
          }
        >
          {fertilizerPlan.has_frg_guidance ? (
            <div className="space-y-5">
              {/* Required products */}
              <div>
                <p className="text-[11px] font-semibold text-slate-500 dark:text-[#777777] uppercase tracking-widest mb-2">
                  {t('Required Products', 'প্রয়োজনীয় সার')}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {(fertilizerPlan.fertilizer_products || []).map((product) => (
                    <div
                      key={product.product_name}
                      className="group p-3.5 rounded-xl bg-white dark:bg-[#0f0f0f] border border-slate-200/80 dark:border-[#222222] transition-all duration-200 hover:border-emerald-300 dark:hover:border-[#3a3a3a]"
                    >
                      <p className="text-sm font-bold text-slate-800 dark:text-[#e0e0e0] leading-snug">
                        {tr(product.product_name)}
                      </p>
                      <p className="text-sm font-bold text-slate-900 dark:text-[#f0f0f0] tabular-nums mt-1.5">
                        {product.quantity_kg.toLocaleString()}{' '}
                        <span className="text-xs font-medium text-slate-400 dark:text-[#666666]">{tr('kg')}</span>
                      </p>
                      {product.bags_50kg != null && (
                        <p className="text-[11px] text-slate-500 dark:text-[#a0a0a0] mt-0.5 tabular-nums">
                          {product.bags_50kg.toLocaleString()} {t('× 50 kg bags', '× ৫০ কেজি বস্তা')}
                        </p>
                      )}
                      <span className="inline-flex items-center gap-1 mt-2 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10">
                        <CheckCircle2 className="w-3 h-3" />
                        {product.nutrient_supplied}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Split application timeline */}
              <div>
                <p className="text-[11px] font-semibold text-slate-500 dark:text-[#777777] uppercase tracking-widest mb-3">
                  {t('Split Application Schedule', 'ভাগ করা প্রয়োগ সময়সূচি')}
                </p>
                <Timeline>
                  {(fertilizerPlan.application_schedule || []).map((stage, i) => (
                    <TimelineStep key={stage.timing_stage} index={i + 1} label={stage.timing_stage}>
                      {stage.products_to_apply.length > 0 ? (
                        <ul className="space-y-1">
                          {stage.products_to_apply.map((item) => (
                            <li
                              key={item}
                              className="text-xs text-slate-600 dark:text-[#a0a0a0] flex items-start gap-1.5"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-slate-400 dark:text-[#555555]">
                          {t('No products at this stage', 'এই পর্যায়ে কোনো সার নেই')}
                        </p>
                      )}
                    </TimelineStep>
                  ))}
                </Timeline>
              </div>

              {/* Safety advisory */}
              {(fertilizerPlan.safety_advisory || []).length > 0 && (
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/70 dark:bg-amber-500/10 dark:border-amber-500/25">
                  <p className="text-[11px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" />
                    {t('Safety Advisory', 'নিরাপত্তা পরামর্শ')}
                  </p>
                  <ul className="space-y-1.5">
                    {fertilizerPlan.safety_advisory!.map((tip) => (
                      <li key={tip} className="text-xs text-amber-900/90 dark:text-amber-200/80 flex items-start gap-2 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="text-[11px] text-slate-400 dark:text-[#555555]">
                {fertilizerPlan.source} •{' '}
                {t(
                  'Confirm final doses with your Upazila Agriculture Officer (DAE).',
                  'চূড়ান্ত ডোজ আপনার উপজেলা কৃষি কর্মকর্তার (ডিএই) সাথে নিশ্চিত করুন।'
                )}
              </p>
            </div>
          ) : (
            <EmptyHint
              text={
                fertilizerPlan.message ||
                t(
                  'Official FRG-2024 nutrient rates are not compiled for this crop. Consult your local Upazila Agriculture Officer (DAE).',
                  'এই ফসলের জন্য সরকারি এফআরজি-২০২৪ পুষ্টি হার সংকলিত হয়নি। আপনার স্থানীয় উপজেলা কৃষি কর্মকর্তার (ডিএই) সাথে পরামর্শ করুন।'
                )
              }
            />
          )}
        </SectionShell>
      )}

      {/* ── Varieties & pests (master catalog) ───────────────────── */}
      {(benchmarks.recommendedVarieties.length > 0 || benchmarks.pestVulnerabilities.length > 0) && (
        <div id="catalog" className="grid grid-cols-1 lg:grid-cols-2 gap-5 scroll-mt-16">
          <Card>
            <CardHeader
              title={t('Approved Varieties', 'অনুমোদিত জাত')}
              subtitle={t('National master catalog cultivars', 'জাতীয় মাস্টার ক্যাটালগের জাত')}
            />
            {benchmarks.recommendedVarieties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {benchmarks.recommendedVarieties.map((variety) => (
                  <div
                    key={variety}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-[#111111] border border-slate-100 dark:border-[#1c1c1c] text-xs font-medium text-slate-700 dark:text-[#e0e0e0]"
                  >
                    <Sprout className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="truncate">{tr(variety)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyHint text={t('No approved varieties recorded.', 'কোনো অনুমোদিত জাত নিবন্ধিত নেই।')} />
            )}
          </Card>

          <Card>
            <CardHeader
              title={t('Pest & Disease Vulnerabilities', 'পোকামাকড় ও রোগের ঝুঁকি')}
              subtitle={t('Known threats from the master catalog', 'মাস্টার ক্যাটালগের পরিচিত ঝুঁকি')}
            />
            {benchmarks.pestVulnerabilities.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {benchmarks.pestVulnerabilities.map((pest) => (
                  <div
                    key={pest}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-50/60 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 text-xs font-medium text-amber-800 dark:text-amber-300"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{tr(pest)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyHint text={t('No pest vulnerabilities recorded.', 'কোনো পোকামাকড়ের ঝুঁকি নিবন্ধিত নেই।')} />
            )}
          </Card>
        </div>
      )}

      {/* ── Data provenance footer ───────────────────────────────── */}
      <div className="p-4 rounded-2xl border border-slate-200/70 dark:border-[#1a1a1a] bg-slate-50/70 dark:bg-[#0f0f0f] flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-slate-400 dark:text-[#666666] mt-0.5 shrink-0" />
          <p className="text-[11px] text-slate-500 dark:text-[#a0a0a0] leading-relaxed max-w-2xl">
            {t(
              'Sections marked with — have no verified source data yet. FarmPath never invents agronomic values; missing sections will appear as official sources are compiled.',
              'যে বিভাগে — চিহ্ন আছে সেখানে এখনো যাচাইকৃত তথ্য নেই। FarmPath কখনো কৃষিগত মান বানায় না; সরকারি উৎস সংকলিত হলে অনুপস্থিত বিভাগ দেখা যাবে।'
            )}
          </p>
        </div>
        <div className="flex gap-1.5 shrink-0">
          <Badge variant={sources.masterCatalog ? 'success' : 'neutral'}>
            {t('Master catalog', 'মাস্টার ক্যাটালগ')} {sources.masterCatalog ? '✓' : '—'}
          </Badge>
          <Badge variant={sources.aiService ? 'success' : 'neutral'}>
            {t('AI service', 'এআই সেবা')} {sources.aiService ? '✓' : '—'}
          </Badge>
        </div>
      </div>
    </div>
  );
};
