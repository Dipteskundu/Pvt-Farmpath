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
} from '@/components/icons';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { useToast } from '@/components/ui/Toast';
import { getCropDetail } from '@/lib/farmerApi';
import {
  CropDetail as CropDetailData,
  CropLifecycle,
  CropClimateEnvelope,
} from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface CropDetailProps {
  cropId: string;
  onBack?: () => void;
}

/** Renders a value or an honest em-dash when the source data has none. */
const Value: React.FC<{ value: React.ReactNode }> = ({ value }) =>
  value === null || value === undefined || value === '' ? (
    <span className="text-slate-400 dark:text-[#555555]">—</span>
  ) : (
    <>{value}</>
  );

const LifecycleRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  window?: string;
}> = ({ icon, label, window: windowValue }) => (
  <div className="flex items-start gap-3 py-2.5 border-b border-slate-100 dark:border-[#1c1c1c] last:border-0">
    <span className="mt-0.5 text-emerald-700 dark:text-emerald-400">{icon}</span>
    <div className="flex-1">
      <p className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-[#666666] font-semibold">
        {label}
      </p>
      <p className="text-sm font-semibold text-slate-800 dark:text-[#e0e0e0] mt-0.5">
        <Value value={windowValue ? tr(windowValue) : null} />
      </p>
    </div>
  </div>
);

const ClimateRow: React.FC<{ label: string; value: React.ReactNode }> = ({
  label,
  value,
}) => (
  <div className="flex items-center justify-between py-2.5 border-b border-slate-100 dark:border-[#1c1c1c] last:border-0">
    <span className="text-xs text-slate-500 dark:text-[#a0a0a0]">{label}</span>
    <span className="text-sm font-semibold text-slate-800 dark:text-[#e0e0e0]">
      <Value value={value} />
    </span>
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

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-40" />
        <div className="h-48 bg-white dark:bg-[#0a0a0a] rounded-2xl border border-slate-200 dark:border-[#222222] p-6">
          <Skeleton className="h-8 w-1/3 mb-3" />
          <Skeleton className="h-4 w-1/4 mb-6" />
          <Skeleton className="h-16 w-full" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-56 bg-white dark:bg-[#0a0a0a] rounded-2xl border border-slate-200 dark:border-[#222222] p-5">
            <Skeleton className="h-5 w-1/3 mb-4" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="h-56 bg-white dark:bg-[#0a0a0a] rounded-2xl border border-slate-200 dark:border-[#222222] p-5">
            <Skeleton className="h-5 w-1/3 mb-4" />
            <Skeleton className="h-32 w-full" />
          </div>
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

  return (
    <div className="space-y-6">
      {/* Back navigation */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          icon={ArrowLeft}
          onClick={onBack}
        >
          {t('Back to Recommendations', 'পরামর্শে ফিরে যান')}
        </Button>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-6 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-700/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold">
              <Sprout className="w-3.5 h-3.5 text-emerald-300" />
              {t('Recommended Crop Profile', 'প্রস্তাবিত ফসলের প্রোফাইল')}
            </div>
            <h2 className="text-2xl font-bold tracking-tight">{displayName}</h2>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-emerald-100/90">
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
            <div className="flex flex-wrap gap-1.5 pt-1">
              {identity.category && (
                <Badge variant="success" className="!bg-emerald-700/60 !text-emerald-100 !border-emerald-400/40">
                  <Layers className="w-3 h-3" />
                  {tr(identity.category)}
                </Badge>
              )}
              {identity.verifiedSeasons.map((season) => (
                <Badge
                  key={season}
                  variant="info"
                  className="!bg-emerald-700/60 !text-emerald-100 !border-emerald-400/40"
                >
                  <Calendar className="w-3 h-3" />
                  {tr(season)}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <Badge
              variant={identity.inMasterCatalog ? 'success' : 'warning'}
              className="!bg-emerald-700/60 !text-emerald-100 !border-emerald-400/40"
            >
              <CheckCircle2 className="w-3 h-3" />
              {identity.inMasterCatalog
                ? t('National master catalog data', 'জাতীয় মাস্টার ক্যাটালগ তথ্য')
                : t('AI model catalog data', 'এআই মডেল ক্যাটালগ তথ্য')}
            </Badge>
            <p className="text-[11px] text-emerald-200/70 max-w-xs md:text-right">
              {t(
                'Benchmark values come from the national master crop catalog; lifecycle, climate, zoning, and fertilizer sections come from the AI agronomy service.',
                'বেঞ্চমার্ক মান জাতীয় মাস্টার ক্রপ ক্যাটালগ থেকে; জীবনচক্র, জলবায়ু, জোনিং ও সার বিভাগ এআই কৃষি সেবা থেকে আসে।'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Key benchmarks */}
      <Card>
        <CardHeader
          title={t('Key Benchmarks', 'মূল বেঞ্চমার্ক')}
          subtitle={t(
            'Verified agronomic and economic reference values',
            'যাচাইকৃত কৃষি ও অর্থনৈতিক রেফারেন্স মান'
          )}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            {
              icon: <Clock className="w-4 h-4" />,
              label: t('Maturity', 'পরিপক্বতা'),
              value:
                benchmarks.maturityPeriodDays != null
                  ? `${benchmarks.maturityPeriodDays} ${t('days', 'দিন')}`
                  : null,
            },
            {
              icon: <Sprout className="w-4 h-4" />,
              label: t('Est. Yield / Acre', 'সম্ভাব্য ফলন / একর'),
              value:
                benchmarks.estimatedYieldKgPerAcre != null
                  ? `${benchmarks.estimatedYieldKgPerAcre.toLocaleString()} ${tr('kg')}`
                  : null,
            },
            {
              icon: <Coins className="w-4 h-4" />,
              label: t('Benchmark Market Price', 'বেঞ্চমার্ক বাজারদর'),
              value:
                benchmarks.expectedMarketPricePerKg != null
                  ? `৳${benchmarks.expectedMarketPricePerKg}/${tr('kg')}`
                  : null,
            },
            {
              icon: <Droplets className="w-4 h-4" />,
              label: t('Water Requirement', 'পানির প্রয়োজনীয়তা'),
              value:
                benchmarks.waterRequirementMm != null
                  ? `${benchmarks.waterRequirementMm} ${t('mm', 'মিমি')}`
                  : null,
            },
            {
              icon: <FlaskConical className="w-4 h-4" />,
              label: t('Optimal Soil pH', 'সর্বোত্তম মাটির পিএইচ'),
              value: benchmarks.optimalSoilPhRange || null,
            },
            {
              icon: <CloudRain className="w-4 h-4" />,
              label: t('Rainfall Range', 'বৃষ্টিপাতের পরিসর'),
              value:
                benchmarks.minRainfallMm != null && benchmarks.maxRainfallMm != null
                  ? `${benchmarks.minRainfallMm.toLocaleString()} – ${benchmarks.maxRainfallMm.toLocaleString()} ${t('mm', 'মিমি')}`
                  : null,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-3.5 bg-slate-50 dark:bg-[#111111]/60 rounded-xl border border-slate-100 dark:border-[#1c1c1c]"
            >
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-400 dark:text-[#666666] font-semibold mb-1.5">
                <span className="text-emerald-700 dark:text-emerald-400">{stat.icon}</span>
                {stat.label}
              </div>
              <p className="text-base font-bold text-slate-800 dark:text-[#e0e0e0]">
                <Value value={stat.value} />
              </p>
            </div>
          ))}
        </div>

        {benchmarks.recommendedSeason && (
          <div className="mt-3 p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100 text-xs text-slate-700 dark:text-[#999999]">
            <span className="font-semibold text-emerald-800">
              {t('Recommended Season', 'প্রস্তাবিত মৌসুম')}:{' '}
            </span>
            {tr(benchmarks.recommendedSeason)}
          </div>
        )}
      </Card>

      {/* Growing calendar + climate */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader
            title={t('Growing Calendar', 'চাষাবাদের ক্যালেন্ডার')}
            subtitle={t(
              'Phenological lifecycle windows from the SPAS crop dataset',
              'SPAS ফসল ডেটাসেট থেকে জীবনচক্রের সময়সীমা'
            )}
          />
          {lifecycle ? (
            <div>
              <LifecycleRow
                icon={<Sprout className="w-4 h-4" />}
                label={t('Transplant / Sowing Window', 'রোপণ / বপনের সময়')}
                window={lifecycle.transplant_window}
              />
              <LifecycleRow
                icon={<TrendingUp className="w-4 h-4" />}
                label={t('Growth Window', 'বৃদ্ধির সময়')}
                window={lifecycle.growth_window}
              />
              <LifecycleRow
                icon={<Calendar className="w-4 h-4" />}
                label={t('Harvest Window', 'ফসল তোলার সময়')}
                window={lifecycle.harvest_window}
              />
            </div>
          ) : (
            <EmptySection
              text={t(
                'Lifecycle windows are not available for this crop yet.',
                'এই ফসলের জীবনচক্রের সময়সীমা এখনো পাওয়া যায়নি।'
              )}
            />
          )}
        </Card>

        <Card>
          <CardHeader
            title={t('Climate Requirements', 'জলবায়ুর প্রয়োজনীয়তা')}
            subtitle={t(
              'Observed temperature and humidity envelope',
              'পর্যবেক্ষিত তাপমাত্রা ও আর্দ্রতার পরিসর'
            )}
          />
          {climateEnvelope ? (
            <div>
              <ClimateRow
                label={t('Optimal Average Temperature', 'সর্বোত্তম গড় তাপমাত্রা')}
                value={`${climateEnvelope.optimal_avg_temp_c}°C`}
              />
              <ClimateRow
                label={t('Temperature Tolerance', 'তাপমাত্রা সহনসীমা')}
                value={`${climateEnvelope.min_temp_c}°C – ${climateEnvelope.max_temp_c}°C`}
              />
              <ClimateRow
                label={t('Optimal Average Humidity', 'সর্বোত্তম গড় আর্দ্রতা')}
                value={`${climateEnvelope.optimal_avg_humidity_pct}%`}
              />
              <ClimateRow
                label={t('Humidity Tolerance', 'আর্দ্রতা সহনসীমা')}
                value={`${climateEnvelope.min_rh_pct}% – ${climateEnvelope.max_rh_pct}%`}
              />
            </div>
          ) : (
            <EmptySection
              text={t(
                'Climate envelope data is not available for this crop yet.',
                'এই ফসলের জলবায়ু তথ্য এখনো পাওয়া যায়নি।'
              )}
            />
          )}
        </Card>
      </div>

      {/* BARC suitability */}
      {barcSuitability && (
        <Card>
          <CardHeader
            title={t('BARC Crop Zoning Suitability', 'বার্ক ক্রপ জোনিং উপযুক্ততা')}
            subtitle={barcSuitability.district
              ? `${t('Official assessment for', 'সরকারি মূল্যায়ন —')} ${barcSuitability.district}`
              : t('Official BARC National Crop Zoning assessment', 'সরকারি বার্ক জাতীয় ক্রপ জোনিং মূল্যায়ন')}
          />
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <Badge variant={barcOk ? 'success' : 'neutral'} size="md">
              <MapPin className="w-3.5 h-3.5" />
              {tr(barcClass || '')}
            </Badge>
            {barcSuitability.details && (
              <p className="text-xs text-slate-500 dark:text-[#a0a0a0] flex-1">
                {tr(String(barcSuitability.details))}
              </p>
            )}
          </div>
        </Card>
      )}

      {/* FRG-2024 fertilizer plan */}
      {fertilizerPlan && (
        <Card>
          <CardHeader
            title={t('BARC FRG-2024 Fertilizer Plan', 'বার্ক এফআরজি-২০২৪ সার পরিকল্পনা')}
            subtitle={
              fertilizerPlan.has_frg_guidance
                ? t(
                    'Official nutrient rates scaled to your registered farm area',
                    'আপনার নিবন্ধিত জমির আকার অনুযায়ী সরকারি পুষ্টি হার'
                  )
                : undefined
            }
          />
          {fertilizerPlan.has_frg_guidance ? (
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-semibold text-slate-700 dark:text-[#999999] uppercase tracking-wider mb-2">
                  {t('Required Products', 'প্রয়োজনীয় সার')}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {(fertilizerPlan.fertilizer_products || []).map((product) => (
                    <div
                      key={product.product_name}
                      className="p-3 bg-slate-50 dark:bg-[#111111]/60 rounded-xl border border-slate-100 dark:border-[#1c1c1c]"
                    >
                      <p className="text-sm font-bold text-slate-800 dark:text-[#e0e0e0]">
                        {tr(product.product_name)}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-[#a0a0a0] mt-0.5">
                        {product.quantity_kg.toLocaleString()} {tr('kg')}
                        {product.bags_50kg != null
                          ? ` • ${product.bags_50kg.toLocaleString()} ${t('× 50 kg bags', '× ৫০ কেজি বস্তা')}`
                          : ''}
                      </p>
                      <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium mt-1">
                        {product.nutrient_supplied}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-semibold text-slate-700 dark:text-[#999999] uppercase tracking-wider mb-2">
                  {t('Split Application Schedule', 'ভাগ করা প্রয়োগ সময়সূচি')}
                </p>
                <div className="space-y-2">
                  {(fertilizerPlan.application_schedule || []).map((stage, i) => (
                    <div
                      key={stage.timing_stage}
                      className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 dark:border-[#1c1c1c] bg-white dark:bg-[#0a0a0a]"
                    >
                      <span className="w-6 h-6 shrink-0 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-[#e0e0e0]">
                          {stage.timing_stage}
                        </p>
                        {stage.products_to_apply.length > 0 ? (
                          <ul className="mt-1 space-y-0.5">
                            {stage.products_to_apply.map((item) => (
                              <li
                                key={item}
                                className="text-xs text-slate-500 dark:text-[#a0a0a0] flex items-start gap-1.5"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs text-slate-400 dark:text-[#555555] mt-0.5">
                            {t('No products at this stage', 'এই পর্যায়ে কোনো সার নেই')}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {(fertilizerPlan.safety_advisory || []).length > 0 && (
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 dark:bg-amber-500/10 dark:border-amber-500/25">
                  <p className="text-[11px] font-semibold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-1.5">
                    {t('Safety Advisory', 'নিরাপত্তা পরামর্শ')}
                  </p>
                  <ul className="space-y-1">
                    {fertilizerPlan.safety_advisory!.map((tip) => (
                      <li key={tip} className="text-xs text-amber-800/90 dark:text-amber-200/80 flex items-start gap-1.5">
                        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
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
            <EmptySection
              text={
                fertilizerPlan.message ||
                t(
                  'Official FRG-2024 nutrient rates are not compiled for this crop. Consult your local Upazila Agriculture Officer (DAE).',
                  'এই ফসলের জন্য সরকারি এফআরজি-২০২৪ পুষ্টি হার সংকলিত হয়নি। আপনার স্থানীয় উপজেলা কৃষি কর্মকর্তার (ডিএই) সাথে পরামর্শ করুন।'
                )
              }
            />
          )}
        </Card>
      )}

      {/* Varieties & pests (master catalog) */}
      {(benchmarks.recommendedVarieties.length > 0 || benchmarks.pestVulnerabilities.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader
              title={t('Approved Varieties', 'অনুমোদিত জাত')}
              subtitle={t('National master catalog cultivars', 'জাতীয় মাস্টার ক্যাটালগের জাত')}
            />
            {benchmarks.recommendedVarieties.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {benchmarks.recommendedVarieties.map((variety) => (
                  <Badge key={variety} variant="success">
                    <Sprout className="w-3 h-3" />
                    {tr(variety)}
                  </Badge>
                ))}
              </div>
            ) : (
              <EmptySection
                text={t('No approved varieties recorded.', 'কোনো অনুমোদিত জাত নিবন্ধিত নেই।')}
              />
            )}
          </Card>

          <Card>
            <CardHeader
              title={t('Pest & Disease Vulnerabilities', 'পোকামাকড় ও রোগের ঝুঁকি')}
              subtitle={t('Known threats from the master catalog', 'মাস্টার ক্যাটালগের পরিচিত ঝুঁকি')}
            />
            {benchmarks.pestVulnerabilities.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {benchmarks.pestVulnerabilities.map((pest) => (
                  <Badge key={pest} variant="warning">
                    <ShieldCheck className="w-3 h-3" />
                    {tr(pest)}
                  </Badge>
                ))}
              </div>
            ) : (
              <EmptySection
                text={t('No pest vulnerabilities recorded.', 'কোনো পোকামাকড়ের ঝুঁকি নিবন্ধিত নেই।')}
              />
            )}
          </Card>
        </div>
      )}

      {/* Data provenance footer */}
      <div className="p-4 rounded-2xl border border-slate-200 dark:border-[#222222] bg-white dark:bg-[#0a0a0a] flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-slate-400 dark:text-[#666666] mt-0.5 shrink-0" />
          <p className="text-[11px] text-slate-500 dark:text-[#a0a0a0]">
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

const EmptySection: React.FC<{ text: string }> = ({ text }) => (
  <div className="p-4 rounded-xl border border-dashed border-slate-200 dark:border-[#333333] text-center">
    <p className="text-xs text-slate-400 dark:text-[#555555]">{text}</p>
  </div>
);
