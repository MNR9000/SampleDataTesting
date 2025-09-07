"use client"

import type React from "react"
import { Navigation } from "@/components/navigation"
import { useState } from "react"

export default function SubmitPage() {
  const [message, setMessage] = useState("")
  const [propertyType, setPropertyType] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const data = {
      title: formData.get("title") as string,
      location: formData.get("location") as string,
      size: formData.get("size") as string,
      price: formData.get("price") as string,
      description: formData.get("description") as string,
      propertyType: formData.get("propertyType") as string,
      image: formData.get("image") as File,
    }

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          location: data.location,
          size: data.size,
          price: data.price,
          description: data.description,
          propertyType: data.propertyType,
          // Note: Image handling would need additional processing for file upload
        }),
      })

      const result = await res.json()
      setMessage(result.message || "Property listing submitted successfully!")
      form.reset()
      setPropertyType("")
    } catch (error) {
      setMessage("Error submitting listing. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-card rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-card-foreground mb-6 text-center">Submit Property Listing</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-3">Property Type *</label>
              <div className="space-y-2">
                {[
                  { value: "open-plots", label: "Open Plots" },
                  { value: "agricultural-lands", label: "Agricultural Lands" },
                  { value: "houses-villas", label: "Houses/Villas" },
                  { value: "commercial-retail", label: "Commercial/Retail Spaces" },
                ].map((option) => (
                  <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="propertyType"
                      value={option.value}
                      checked={propertyType === option.value}
                      onChange={(e) => setPropertyType(e.target.value)}
                      required
                      className="w-4 h-4 text-primary focus:ring-primary focus:ring-2"
                    />
                    <span className="text-card-foreground">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-card-foreground mb-2">
                Property Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter property title"
                required
                className="w-full px-4 py-3 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-card-foreground mb-2">
                Location *
              </label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Enter property location"
                required
                className="w-full px-4 py-3 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              />
            </div>

            <div>
              <label htmlFor="size" className="block text-sm font-medium text-card-foreground mb-2">
                Property Size *
              </label>
              <input
                id="size"
                name="size"
                type="text"
                placeholder="Enter property size (e.g., 1500 sq ft, 2 acres)"
                required
                className="w-full px-4 py-3 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-card-foreground mb-2">
                Property Price *
              </label>
              <input
                id="price"
                name="price"
                type="text"
                placeholder="Enter property price (e.g., ₹50,00,000, ₹2.5 Cr)"
                required
                className="w-full px-4 py-3 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-card-foreground mb-2">
                Property Image
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="w-full px-4 py-3 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-card-foreground mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                placeholder="Describe the property, amenities, features, etc."
                required
                className="w-full px-4 py-3 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground resize-vertical"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-md font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
            >
              Submit Property Listing
            </button>
          </form>

          {message && (
            <div
              className={`mt-4 p-4 rounded-md ${
                message.includes("Error")
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
