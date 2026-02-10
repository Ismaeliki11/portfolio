"use client";

import { useEffect, useState } from "react";

export type GitHubStats = {
    repos: number;
    followers: number;
    contributions: number;
    lastCommit: string;
    loading: boolean;
};

export function useGitHubStats(username: string) {
    const [stats, setStats] = useState<GitHubStats>({
        repos: 0,
        followers: 0,
        contributions: 0,
        lastCommit: "---",
        loading: true,
    });

    useEffect(() => {
        async function fetchStats() {
            try {
                const userResponse = await fetch(`https://api.github.com/users/${username}`);
                const userData = await userResponse.json();

                const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public`);
                const eventsData = await eventsResponse.json();

                const pushEvent = eventsData.find((e: any) => e.type === "PushEvent");
                const lastCommitDate = pushEvent
                    ? new Date(pushEvent.created_at).toLocaleDateString("es-ES", { day: '2-digit', month: 'short' })
                    : "Recently";

                setStats({
                    repos: userData.public_repos || 0,
                    followers: userData.followers || 0,
                    contributions: (userData.public_repos * 12) + (userData.followers * 5), // Heuristic mock
                    lastCommit: lastCommitDate,
                    loading: false,
                });
            } catch (error) {
                console.error("Error fetching GitHub stats:", error);
                setStats(prev => ({ ...prev, loading: false }));
            }
        }

        fetchStats();
    }, [username]);

    return stats;
}
