import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Paintbrush, ShieldCheck, Zap, Coins } from "lucide-react"

export default function LandingPageFeatures() {
  const features = [
    {
      icon: Paintbrush,
      title: "Create & Sell",
      description: "Easily mint your digital creations and sell them on our marketplace."
    },
    {
      icon: ShieldCheck,
      title: "Secure Transactions",
      description: "Our platform ensures safe and transparent transactions for all users."
    },
    {
      icon: Zap,
      title: "Fast Minting",
      description: "Mint your NFTs quickly with our optimized creation process."
    },
    {
      icon: Coins,
      title: "Low Fees",
      description: "Enjoy competitive fees that maximize your earnings from sales."
    }
  ]

  return (
    <section className="py-16 bg-accent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold  mb-4">Why Choose Our NFT Marketplace</h2>
          <p className="text-xl  max-w-2xl mx-auto">
            Discover the advantages of using our platform for all your NFT needs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="">
              <CardHeader>
                <feature.icon className="h-10 w-10 mb-4" />
                <CardTitle className="text-xl font-semibold t">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}