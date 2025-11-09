"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, Bell, Shield, Eye } from "lucide-react"

export function PreferencesPanel() {
  const [preferences, setPreferences] = useState({
    notifications: true,
    emailAlerts: true,
    publicProfile: false,
    showImpact: true,
  })

  const handleToggle = (key: string) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const preferenceOptions = [
    {
      title: "Push Notifications",
      description: "Get notified about yield updates",
      icon: Bell,
      key: "notifications",
    },
    {
      title: "Email Alerts",
      description: "Receive email summaries",
      icon: Settings,
      key: "emailAlerts",
    },
    {
      title: "Public Profile",
      description: "Make your profile discoverable",
      icon: Eye,
      key: "publicProfile",
    },
    {
      title: "Show Impact Stats",
      description: "Display your impact publicly",
      icon: Shield,
      key: "showImpact",
    },
  ]

  return (
    <Card className="border-border/50 bg-gradient-to-br from-card to-background">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings size={20} />
          Preferences
        </CardTitle>
        <CardDescription>Manage your settings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {preferenceOptions.map((option) => {
            const Icon = option.icon
            return (
              <div
                key={option.key}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-background/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Icon className="text-primary" size={20} />
                  <div>
                    <p className="font-semibold text-sm">{option.title}</p>
                    <p className="text-xs text-foreground/60">{option.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle(option.key)}
                  className={`w-12 h-6 rounded-full transition-all flex items-center px-1 ${
                    preferences[option.key as keyof typeof preferences]
                      ? "bg-primary/70 justify-end"
                      : "bg-foreground/10 justify-start"
                  }`}
                >
                  <div className="w-5 h-5 bg-background rounded-full" />
                </button>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
