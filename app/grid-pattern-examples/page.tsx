"use client";

import { GridPatternDemo, GridPatternLinearGradient, GridPatternDashed } from "@/components/ui/grid-pattern-demo";

export default function GridPatternExamplesPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="py-16 bg-accent-cream/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 green-title-text">
              Grid Pattern Examples
            </h1>
            <p className="text-lg text-text-brown/80 mb-6">
              Various implementations of the grid pattern component
            </p>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-text-brown">Standard Grid Pattern with Squares</h2>
              <div className="h-[500px] relative">
                <GridPatternDemo />
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6 text-text-brown">Linear Gradient Grid Pattern</h2>
              <div className="h-[400px] relative">
                <GridPatternLinearGradient />
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6 text-text-brown">Dashed Grid Pattern with Radial Mask</h2>
              <div className="h-[400px] relative">
                <GridPatternDashed />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section className="py-16 bg-accent-cream/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 green-title-text">Grid Pattern Documentation</h2>
            
            <div className="bg-white p-8 rounded-xl shadow-warm">
              <h3 className="text-xl font-bold mb-4 text-text-brown">Props</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b text-left text-sm font-medium text-primary-green">Prop</th>
                      <th className="py-2 px-4 border-b text-left text-sm font-medium text-primary-green">Type</th>
                      <th className="py-2 px-4 border-b text-left text-sm font-medium text-primary-green">Default</th>
                      <th className="py-2 px-4 border-b text-left text-sm font-medium text-primary-green">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-text-brown/80">
                    <tr>
                      <td className="py-2 px-4 border-b">width</td>
                      <td className="py-2 px-4 border-b">number</td>
                      <td className="py-2 px-4 border-b">40</td>
                      <td className="py-2 px-4 border-b">Width of each grid cell</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">height</td>
                      <td className="py-2 px-4 border-b">number</td>
                      <td className="py-2 px-4 border-b">40</td>
                      <td className="py-2 px-4 border-b">Height of each grid cell</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">x</td>
                      <td className="py-2 px-4 border-b">number</td>
                      <td className="py-2 px-4 border-b">-1</td>
                      <td className="py-2 px-4 border-b">X position of the grid</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">y</td>
                      <td className="py-2 px-4 border-b">number</td>
                      <td className="py-2 px-4 border-b">-1</td>
                      <td className="py-2 px-4 border-b">Y position of the grid</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">strokeDasharray</td>
                      <td className="py-2 px-4 border-b">string</td>
                      <td className="py-2 px-4 border-b">"0"</td>
                      <td className="py-2 px-4 border-b">SVG stroke dash pattern</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">squares</td>
                      <td className="py-2 px-4 border-b">Array&lt;[number, number]&gt;</td>
                      <td className="py-2 px-4 border-b">undefined</td>
                      <td className="py-2 px-4 border-b">Coordinates for filled squares</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b">className</td>
                      <td className="py-2 px-4 border-b">string</td>
                      <td className="py-2 px-4 border-b">undefined</td>
                      <td className="py-2 px-4 border-b">Additional CSS classes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}