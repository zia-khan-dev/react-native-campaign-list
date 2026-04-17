import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type SubmissionStatus = 'pending' | 'approved' | 'rejected';

export type Submission = {
  id: string;
  campaignId: string;
  videoUrl: string;
  status: SubmissionStatus;
  createdAt: number;
};

type SubmissionsContextValue = {
  submissions: Submission[];
  getLatestForCampaign: (campaignId: string) => Submission | undefined;
  submitUrl: (campaignId: string, videoUrl: string) => string;
};

const SubmissionsContext = createContext<SubmissionsContextValue | null>(null);

/** Deterministic mock outcome so QA reliably sees both results (not RNG-heavy "always approved"). */
function mockReviewAfterDelay(
  submissionId: string,
  orderIndexForCampaign: number,
  setSubmissions: React.Dispatch<React.SetStateAction<Submission[]>>,
) {
  const delayMs = 1800 + Math.floor(Math.random() * 1400);
  setTimeout(() => {
    const status: SubmissionStatus = orderIndexForCampaign % 2 === 0 ? 'rejected' : 'approved';
    setSubmissions((prev) =>
      prev.map((s) => (s.id === submissionId ? { ...s, status } : s)),
    );
  }, delayMs);
}

export function SubmissionsProvider({ children }: { children: React.ReactNode }) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  const getLatestForCampaign = useCallback(
    (campaignId: string) =>
      submissions
        .filter((s) => s.campaignId === campaignId)
        .sort((a, b) => b.createdAt - a.createdAt)[0],
    [submissions],
  );

  const submitUrl = useCallback((campaignId: string, videoUrl: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    let orderIndexForCampaign = 0;
    setSubmissions((prev) => {
      orderIndexForCampaign = prev.filter((s) => s.campaignId === campaignId).length;
      const row: Submission = {
        id,
        campaignId,
        videoUrl: videoUrl.trim(),
        status: 'pending',
        createdAt: Date.now(),
      };
      return [row, ...prev];
    });
    mockReviewAfterDelay(id, orderIndexForCampaign, setSubmissions);
    return id;
  }, []);

  const value = useMemo(
    () => ({
      submissions,
      getLatestForCampaign,
      submitUrl,
    }),
    [submissions, getLatestForCampaign, submitUrl],
  );

  return <SubmissionsContext.Provider value={value}>{children}</SubmissionsContext.Provider>;
}

export function useSubmissions() {
  const ctx = useContext(SubmissionsContext);
  if (!ctx) throw new Error('useSubmissions must be used within SubmissionsProvider');
  return ctx;
}
