import React from 'react';

const About: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-12 reveal">
            {/* Hero Section */}
            <section className="text-center space-y-6">
                <h1 className="font-serif text-4xl md:text-5xl text-clay-900 reveal-heading">About Lippan Art</h1>
                <p className="text-lg md:text-xl text-clay-600 max-w-2xl mx-auto leading-relaxed">
                    Discover the traditional mud and mirror art form from Kutch, Gujarat, handcrafted to bring elegance and positive energy to your space.
                </p>
            </section>

            {/* What is Lippan Art */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-clay-100 reveal" style={{ transitionDelay: '0.2s' }}>
                <h2 className="font-serif text-2xl text-clay-900 mb-4">What is Lippan Art?</h2>
                <p className="text-clay-700 leading-relaxed mb-4">
                    Lippan Kaam, or Mud and Mirror Work, is a traditional mural craft of Kutch, Gujarat. Historically, it was done on the inner walls of huts (bhungas) using a mixture of clay and camel dung to keep the interiors cool. Today, it has evolved into a sophisticated art form used for home decor, blending traditional motifs with modern aesthetics.
                </p>
                <p className="text-clay-700 leading-relaxed">
                    The art creates a mesmerizing play of light through the use of small mirrors (abhla) embedded in the clay relief work, creating a 3D effect that brightens up any room.
                </p>
            </section>

            {/* Pricing & Customization */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-clay-100 reveal" style={{ transitionDelay: '0.3s' }}>
                    <h2 className="font-serif text-2xl text-clay-900 mb-4">Pricing & Customization</h2>
                    <ul className="space-y-4 text-clay-700">
                        <li className="flex items-start gap-3">
                            <span className="bg-clay-100 p-1 rounded-full text-lg">💰</span>
                            <span>
                                <strong>Varies by Size & Complexity:</strong> Prices depend on the canvas size (e.g., 8x8, 12x12, 16x16 inches) and the intricacy of the design.
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="bg-clay-100 p-1 rounded-full text-lg">🎨</span>
                            <span>
                                <strong>Fully Customizable:</strong> Choose your preferred colors, shapes (Circle, Square, Rectangle), and mirror arrangements.
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="bg-clay-100 p-1 rounded-full text-lg">✨</span>
                            <span>
                                <strong>Premium Materials:</strong> We use high-quality MDF boards, mold-it clay, and acrylic paints for durability and finish.
                            </span>
                        </li>
                    </ul>
                </div>

                <div className="bg-clay-800 text-white p-8 rounded-2xl shadow-lg reveal" style={{ transitionDelay: '0.4s' }}>
                    <h2 className="font-serif text-2xl mb-4 text-clay-50">Why Choose Us?</h2>
                    <ul className="space-y-4 text-clay-200">
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>100% Handcrafted by Skilled Artists</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Custom Name Plates & Photo Frames</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Unique Gift for Weddings & Housewarmings</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Durable & Long-lasting Decor</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Image Gallery Showcase (Placeholder) */}
            <section className="reveal" style={{ transitionDelay: '0.5s' }}>
                <h2 className="font-serif text-2xl text-clay-900 mb-6 text-center">Our Craftsmanship</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="aspect-square bg-clay-100 rounded-xl overflow-hidden">
                        <img src="./decor_circle_1.jpg" alt="Lippan Art 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="aspect-square bg-clay-100 rounded-xl overflow-hidden">
                        <img src="./decor_square_1.jpg" alt="Lippan Art 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="aspect-square bg-clay-100 rounded-xl overflow-hidden">
                        <img src="./photo_frame_circle_1.jpg" alt="Lippan Art 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="aspect-square bg-clay-100 rounded-xl overflow-hidden">
                        <img src="./name_plate_1.jpg" alt="Lippan Art 4" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
