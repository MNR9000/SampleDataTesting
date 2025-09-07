import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, MapPin, Users, Star } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-muted py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Welcome Admin   
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            Submit your Property listing in this page and wait for some time for it to reflect in the main page                    
          </p>
          
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{"Please prepare the following data before getting started"}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The following are essential for the property as they give look and feel for the main page                 
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Property details </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Curated description of properties, Size of the property and price of the property.             
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Prime Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Location of Properties, neighborhoods and business districts.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>{"Category of property"}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {"Please be clear under which category the plot/property will fall under."}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Star className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Image of the property   </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Image of property for discovery process that saves you time.</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      

      {/* Footer */}
      
    </div>
  )
}
