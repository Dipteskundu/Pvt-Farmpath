import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { tr } from "@/lib/localize";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Award,
  Clock,
  Droplets,
  Coins,
  Wind,
  FlaskConical,
  TrendingUp,
} from '@/components/icons';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FormInput, FormSelect } from '@/components/ui/FormInput';
import { useToast } from '@/components/ui/Toast';
import { Skeleton } from '@/components/ui/Skeleton';
import { SuitabilityRing, RiskPill } from './recommendation-ui';
import { getCropRecommendations, getFarms } from '@/lib/farmerApi';
import { CropRecommendationItem, CropRecommendationInput, Farm } from '@/types';
import { FarmerModuleKey } from '@/features/layout';
import { useLanguage } from '@/contexts/LanguageContext';

interface CropRecommendationProps {
  onNavigate?: (module: FarmerModuleKey) => void;
}

export const CropRecommendation: React.FC<CropRecommendationProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const { language } = useLanguage();
  const router = useRouter();

  /**
   * The engine composes key-advantage sentences dynamically
   * (`Maturity in N days (season)`, `Benchmark market price BDT N/kg`,
   * `Manage N known pests proactively`), so a whole-string dict lookup can
   * never match. Rebuild those three patterns bangla-side; everything else
   * falls back to the dictionary.
   */
  const recText = (s: string): string => {
    const maturity = s.match(/^Maturity in (\d+) days \((.*)\)$/);
    if (maturity) {
      const season = tr(maturity[2]);
      return language === "bn"
        ? `${maturity[1]} দিনে পাক (${season})`
        : `Maturity in ${maturity[1]} days (${season})`;
    }
    const price = s.match(/^Benchmark market price BDT (\d+)\/kg$/);
    if (price) {
      return language === "bn"
        ? `বেঞ্চমার্ক বাজারদর ৳${price[1]}/কেজি`
        : `Benchmark market price BDT ${price[1]}/kg`;
    }
    const pests = s.match(/^Manage (\d+) known pests proactively$/);
    if (pests) {
      return language === "bn"
        ? `${pests[1]}টি পরিচিত পোকামাকড় সক্রিয়ভাবে নিয়ন্ত্রণ করুন`
        : `Manage ${pests[1]} known pests proactively`;
    }
    return tr(s);
  };
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<CropRecommendationItem[]>([]);
  const [farms, setFarms] = useState<Farm[]>([]);
  const [farmsLoading, setFarmsLoading] = useState(true);
  const [inputForm, setInputForm] = useState<CropRecommendationInput>({
    soilType: 'Alluvial Clay Loam',
    nitrogen: 135,
    phosphorus: 24,
    potassium: 110,
    ph: 6.6,
    rainfallMm: 350,
    temperatureCelsius: 28,
    season: 'Rabi (Winter)',
    targetLandSizeAcres: 4.2,
  });


  const loadRecommendations = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getCropRecommendations(inputForm);
      if (res.success) {
        setRecommendations(res.data);
      }
    } catch {
      showToast('error', tr('Failed to run recommendation engine'));
    } finally {
      setLoading(false);
    }
  }, [inputForm, showToast]);



  useEffect(() => {
    let cancelled = false;

    async function loadFarmList() {
      try {
        setFarmsLoading(true);
        const res = await getFarms();

        if (cancelled) return;

        if (res.success) {
          const activeFarms = res.data.filter(
            (farm) => farm.status === 'active'
          );

          setFarms(activeFarms);

          if (activeFarms.length > 0) {
            setInputForm((previous) => ({
              ...previous,
              farmId:
                previous.farmId &&
                  activeFarms.some((farm) => farm.id === previous.farmId)
                  ? previous.farmId
                  : activeFarms[0].id,
            }));
          }
        }
      } catch {
        if (!cancelled) {
          showToast('error', tr('Failed to load farms'));
        }
      } finally {
        if (!cancelled) {
          setFarmsLoading(false);
        }
      }
    }

    void loadFarmList();

    return () => {
      cancelled = true;
    };
  }, [showToast]);

  useEffect(() => {
    if (farmsLoading || !inputForm.farmId) return;

    const timeoutId = setTimeout(() => {
      void loadRecommendations();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [farmsLoading, inputForm.farmId, loadRecommendations]);



  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (farmsLoading || !inputForm.farmId) {
      showToast('error', tr('Please select an active farm first'));
      return;
    }

    await loadRecommendations();
  };


  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="bg-white dark:bg-[#0a0a0a] p-5 rounded-2xl border border-slate-200 dark:border-[#222222]/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-[#f0f0f0]">
              {language === 'bn' ? 'এআই ফসল পরামর্শ ও লাভজনকতা নির্ধারণ' : 'Crop Suitability & ROI Recommendation'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-[#a0a0a0]">
            {language === 'bn'
              ? 'মাটির নাইট্রোজেন, ফসফরাস, পটাশ, পিএইচ মাত্রা এবং আবহাওয়ার পূর্বাভাস বিশ্লেষণ করে সেরা ফসল নির্ধারণ করা হয়।'
              : 'Agronomic algorithms evaluate soil NPK, pH, forecasted seasonal weather, and market price margins.'}
          </p>
        </div>

        {onNavigate && (
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('comparison')}
            >
              {language === 'bn' ? 'পাশাপাশি ফসলের তুলনা' : 'Side-by-Side Comparison'}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onNavigate('ai_result')}
            >
              {language === 'bn' ? 'মাটি রোগ নির্ণয়' : 'AI Soil Diagnostics'}
            </Button>
          </div>
        )}
      </div>

      {/* Input Parameters Form Card */}
      <Card>
        <CardHeader
          title={language === 'bn' ? 'মাটির উপাদান ও মৌসুমের তথ্য' : 'Input Soil Chemistry & Season Parameters'}
          subtitle={language === 'bn' ? 'আপনার জমির পরিমাপ ও মাটির মান অনুযায়ী সঠিক পরামর্শ পান' : 'Adjust values to run predictive agronomic simulations for your plots'}
        />

        <form onSubmit={handleCalculate} className="space-y-4">

          <div className="max-w-md">
            <FormSelect
              id="recommendationFarm"
              label={language === 'bn' ? 'জমি নির্বাচন করুন' : 'Select Farm'}
              value={inputForm.farmId || ''}
              onChange={(e) => {
                const selectedFarm = farms.find(
                  (farm) => farm.id === e.target.value
                );

                setInputForm((previous) => ({
                  ...previous,
                  farmId: e.target.value,
                  ...(selectedFarm
                    ? {
                      soilType: selectedFarm.soilClassification,
                      targetLandSizeAcres: selectedFarm.totalAreaAcres,
                    }
                    : {}),
                }));
              }}
              options={farms.map((farm) => ({
                value: farm.id,
                label: `${farm.name} - ${farm.location}`,
              }))}
              disabled={farmsLoading || farms.length === 0}
            />

            {!farmsLoading && farms.length === 0 && (
              <p className="mt-1 text-xs text-amber-600">
                {language === 'bn'
                  ? 'প্রথমে একটি সক্রিয় জমি নিবন্ধন করুন।'
                  : 'Register an active farm before generating recommendations.'}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <FormSelect
              id="season"
              label={language === 'bn' ? 'ফসল চাষের মৌসুম' : 'Cropping Season'}
              value={inputForm.season}
              onChange={(e) =>
                setInputForm({
                  ...inputForm,
                  season: e.target.value as CropRecommendationInput['season'],
                })
              }
              options={[
                { value: 'Rabi (Winter)', label: language === 'bn' ? 'রবি (শীতকাল) - কার্তিক থেকে ফাল্গুন' : 'Rabi (Winter) - Nov to Mar' },
                { value: 'Kharif-1 (Early Summer)', label: language === 'bn' ? 'খরিপ-১ (গ্রীষ্মকাল) - চৈত্র থেকে জ্যৈষ্ঠ' : 'Kharif-1 (Early Summer) - Apr to Jun' },
                { value: 'Kharif-2 (Monsoon)', label: language === 'bn' ? 'খরিপ-২ (বর্ষাকাল) - আষাঢ় থেকে আশ্বিন' : 'Kharif-2 (Monsoon) - Jul to Oct' },
              ]}
            />

            <FormInput
              id="soilType"
              label={language === 'bn' ? 'মাটির ধরণ' : 'Soil Classification'}
              value={inputForm.soilType}
              onChange={(e) => setInputForm({ ...inputForm, soilType: e.target.value })}
            />

            <FormInput
              id="targetAcreage"
              label={language === 'bn' ? 'জমির পরিমাণ (একর)' : 'Target Land Size (Acres)'}
              type="number"
              step="0.1"
              value={inputForm.targetLandSizeAcres}
              onChange={(e) =>
                setInputForm({ ...inputForm, targetLandSizeAcres: Number(e.target.value) })
              }
            />

            <FormInput
              id="ph"
              label={language === 'bn' ? 'মাটির পিএইচ (pH)' : 'Soil pH Level'}
              type="number"
              step="0.1"
              value={inputForm.ph}
              onChange={(e) => setInputForm({ ...inputForm, ph: Number(e.target.value) })}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
            <FormInput
              id="nitrogen"
              label={language === 'bn' ? 'নাইট্রোজেন N (কেজি/হেক্টর)' : 'Nitrogen N (kg/ha)'}
              type="number"
              value={inputForm.nitrogen}
              onChange={(e) => setInputForm({ ...inputForm, nitrogen: Number(e.target.value) })}
            />
            <FormInput
              id="phosphorus"
              label={language === 'bn' ? 'ফসফরাস P (কেজি/হেক্টর)' : 'Phosphorus P (kg/ha)'}
              type="number"
              value={inputForm.phosphorus}
              onChange={(e) => setInputForm({ ...inputForm, phosphorus: Number(e.target.value) })}
            />
            <FormInput
              id="potassium"
              label={language === 'bn' ? 'পটাশিয়াম K (কেজি/হেক্টর)' : 'Potassium K (kg/ha)'}
              type="number"
              value={inputForm.potassium}
              onChange={(e) => setInputForm({ ...inputForm, potassium: Number(e.target.value) })}
            />
            <FormInput
              id="rainfall"
              label={language === 'bn' ? 'বৃষ্টিপাতের পূর্বাভাস (মিমি)' : 'Rainfall Forecast (mm)'}
              type="number"
              value={inputForm.rainfallMm}
              onChange={(e) => setInputForm({ ...inputForm, rainfallMm: Number(e.target.value) })}
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" variant="primary" size="sm" icon={Sparkles} loading={loading}>
              {language === 'bn' ? 'পরামর্শ যাচাই করুন' : 'Run Recommendation Model'}
            </Button>
          </div>
        </form>
      </Card>

      {/* Recommended Output List */}
      <div className="space-y-4">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-[#f0f0f0] tracking-tight">
            {language === 'bn'
              ? 'উপযুক্ততা ও সম্ভাব্য লাভের ভিত্তিতে সেরা ফসল তালিকা'
              : 'Recommended Crop Varieties Ranked by Suitability & Net Return'}
          </h3>
          {!loading && recommendations.length > 0 && (
            <span className="text-xs text-slate-400 dark:text-[#666666] shrink-0 tabular-nums">
              {language === 'bn'
                ? `${recommendations.length}টি ফসল র‍্যাংক করা হয়েছে`
                : `${recommendations.length} crops ranked`}
            </span>
          )}
        </div>

        {/* Skeleton state */}
        {loading && recommendations.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 dark:border-[#222222] p-5 bg-white dark:bg-[#0a0a0a] space-y-4"
              >
                <div className="flex justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="h-[84px] w-[84px] rounded-full" />
                </div>
                <Skeleton className="h-24 w-full rounded-xl" />
                <Skeleton className="h-3.5 w-5/6" />
                <Skeleton className="h-3.5 w-4/6" />
                <Skeleton className="h-3.5 w-full" />
              </div>
            ))}
          </div>
        ) : recommendations.length === 0 ? (
          <Card className="text-center py-10">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <FlaskConical className="w-6 h-6" />
            </div>
            <p className="font-semibold text-slate-800 dark:text-[#e0e0e0] text-sm">
              {language === 'bn' ? 'কোনো পরামর্শ পাওয়া যায়নি' : 'No recommendations yet'}
            </p>
            <p className="text-xs text-slate-500 dark:text-[#a0a0a0] mt-1 max-w-sm mx-auto">
              {language === 'bn'
                ? 'মাটির প্যারামিটার সামঞ্জস্য করে মডেল আবার চালান।'
                : 'Adjust the soil parameters above and run the recommendation model again.'}
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((item, idx) => {
              const isTop = idx === 0;
              const detailHref = `/dashboard/crops/recommend/${encodeURIComponent(item.id)}`;

              return (
                <article
                  key={item.id}
                  role="link"
                  tabIndex={0}
                  aria-label={`${tr(item.cropName)} — ${item.suitabilityScore}% match`}
                  onClick={() => router.push(detailHref)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      router.push(detailHref);
                    }
                  }}
                  className={`group relative flex flex-col bg-white dark:bg-[#0a0a0a] dark-glow rounded-2xl border p-5 outline-none cursor-pointer transition-all duration-300 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black hover:-translate-y-0.5 ${
                    isTop
                      ? 'border-emerald-300 dark:border-emerald-500/40 shadow-[0_10px_36px_rgba(5,150,105,0.10)] hover:shadow-[0_18px_48px_rgba(5,150,105,0.16)] hover:border-emerald-400 dark:hover:border-emerald-400/60'
                      : 'border-slate-200 dark:border-[#222222] hover:border-emerald-300 dark:hover:border-[#3d3d3d] hover:shadow-[0_16px_40px_rgba(2,44,34,0.10)] dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_12px_36px_rgba(0,0,0,0.55)]'
                  }`}
                >
                  {/* Featured ribbon for the top-ranked crop */}
                  {isTop && (
                    <div className="absolute -top-3 left-5 z-10">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        <Award className="w-3 h-3" />
                        {language === 'bn' ? 'সেরা ম্যাচ' : 'Best Match'}
                      </span>
                    </div>
                  )}

                  {/* Identity + confidence */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-7 h-7 shrink-0 rounded-lg text-[11px] font-black flex items-center justify-center ${
                            isTop
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 text-slate-600 dark:bg-[#1a1a1a] dark:text-[#a0a0a0]'
                          }`}
                        >
                          #{idx + 1}
                        </span>
                        <div className="min-w-0">
                          <h4 className="text-base font-bold text-slate-900 dark:text-[#f0f0f0] truncate">
                            {tr(item.cropName)}
                          </h4>
                          <p className="text-[11px] text-slate-400 dark:text-[#666666] italic truncate">
                            {tr(item.scientificName)}
                          </p>
                        </div>
                      </div>

                      {item.recommendedVariety &&
                        item.recommendedVariety !== 'Unavailable' && (
                          <span className="inline-flex items-center gap-1 mt-2 mr-2 text-[11px] font-medium px-2 py-0.5 rounded-md bg-emerald-50/80 text-emerald-800 border border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20">
                            <Sparkles className="w-3 h-3" />
                            {tr(item.recommendedVariety)}
                          </span>
                        )}
                      <div className="mt-2 inline-block">
                        <RiskPill risk={item.riskFactor} />
                      </div>
                    </div>

                    <SuitabilityRing value={item.suitabilityScore} size={84} />
                  </div>

                  {/* Economics — profit is the hero number */}
                  <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white dark:from-[#0d1512] dark:via-[#0c1310] dark:to-[#0a0a0a] border border-emerald-100/80 dark:border-[#1d2a24]">
                    <span className="text-[10px] uppercase tracking-widest text-emerald-700/70 dark:text-emerald-400/70 font-semibold block">
                      {language === 'bn' ? 'নিট লাভ / একর' : 'Net profit / acre'}
                    </span>
                    {item.estimatedProfitPerAcre != null ? (
                      <p className="text-2xl font-black text-emerald-800 dark:text-emerald-300 tabular-nums mt-1 leading-none">
                        ৳{item.estimatedProfitPerAcre.toLocaleString()}
                      </p>
                    ) : (
                      <p className="flex items-baseline gap-2 mt-1">
                        <span className="text-2xl font-black text-slate-300 dark:text-[#3a3a3a] leading-none">
                          —
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-[#555555]">
                          {language === 'bn'
                            ? 'অর্থনৈতিক তথ্য যাচাইয়ের অপেক্ষায়'
                            : 'Economics awaiting verified source'}
                        </span>
                      </p>
                    )}

                    <div className="flex items-center gap-5 mt-3 pt-2.5 border-t border-emerald-100/70 dark:border-[#1d2a24]">
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-[#666666] font-semibold block">
                          {language === 'bn' ? 'ফলন / একর' : 'Yield / acre'}
                        </span>
                        <span className="text-sm font-bold text-slate-800 dark:text-[#e0e0e0] tabular-nums">
                          {item.estimatedYieldKgPerAcre != null
                            ? `${item.estimatedYieldKgPerAcre.toLocaleString()} ${tr('kg')}`
                            : '—'}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-[#666666] font-semibold block">
                          {language === 'bn' ? 'মুনাফা হার' : 'Projected ROI'}
                        </span>
                        <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300 tabular-nums inline-flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" />
                          {item.roiPercentage != null ? `+${item.roiPercentage}%` : '—'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Key advantages — top three, rest deferred to detail page */}
                  <div className="mt-4 space-y-1.5">
                    {item.keyAdvantages.slice(0, 3).map((adv, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-xs text-slate-600 dark:text-[#a0a0a0] leading-relaxed"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className="truncate">{recText(adv)}</span>
                      </div>
                    ))}
                    {item.keyAdvantages.length > 3 && (
                      <p className="text-[11px] text-slate-400 dark:text-[#555555] pl-5.5">
                        +
                        {language === 'bn'
                          ? ` আরও ${item.keyAdvantages.length - 3}টি সুবিধা — বিস্তারিতে দেখুন`
                          : ` ${item.keyAdvantages.length - 3} more benefits in full details`}
                      </p>
                    )}
                  </div>

                  {/* Climate resilience — compact chip */}
                  <div className="mt-3">
                    <span className="inline-flex items-start gap-1.5 text-[11px] px-2.5 py-1.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-100 dark:bg-[#111111] dark:text-[#a0a0a0] dark:border-[#1c1c1c] max-w-full">
                      <Wind className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0 mt-px" />
                      <span className="truncate">
                        <span className="font-semibold text-teal-700 dark:text-teal-400">
                          {language === 'bn' ? 'জলবায়ু সহনশীলতা: ' : 'Climate resilience: '}
                        </span>
                        {recText(item.climateResilience)}
                      </span>
                    </span>
                  </div>

                  {/* Meta footer + CTA affordance */}
                  <div
                    className="pt-4 border-t border-slate-100 dark:border-[#1a1a1a] flex items-center justify-between gap-3"
                    style={{ marginTop: 'auto' }}
                  >
                    <div className="flex items-center gap-4 text-[11px] text-slate-500 dark:text-[#a0a0a0] min-w-0">
                      <span className="inline-flex items-center gap-1" title={language === 'bn' ? 'পাকতে সময়' : 'Maturity'}>
                        <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-[#666666]" />
                        {item.maturityPeriodDays != null
                          ? language === 'bn'
                            ? `${item.maturityPeriodDays} দিন`
                            : `${item.maturityPeriodDays}d`
                          : '—'}
                      </span>
                      <span className="inline-flex items-center gap-1" title={language === 'bn' ? 'পানির প্রয়োজন' : 'Water need'}>
                        <Droplets className="w-3.5 h-3.5 text-slate-400 dark:text-[#666666]" />
                        {item.waterRequirementMm != null
                          ? `${item.waterRequirementMm} ${tr('mm')}`
                          : '—'}
                      </span>
                      <span className="inline-flex items-center gap-1 font-semibold text-slate-700 dark:text-[#e0e0e0]" title={language === 'bn' ? 'বাজারদর' : 'Market price'}>
                        <Coins className="w-3.5 h-3.5 text-slate-400 dark:text-[#666666]" />
                        {item.expectedMarketPricePerKg != null
                          ? `৳${item.expectedMarketPricePerKg}/${tr('kg')}`
                          : '—'}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
                      {language === 'bn' ? 'বিস্তারিত' : 'Details'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
