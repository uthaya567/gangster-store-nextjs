"use client"
import { MdCircle } from "react-icons/md";
import { useSection } from "@/app/components/Custom/Hook/SectionContext";
import { useEffect } from "react";

export default function About() {
  const { setSection } = useSection();
  useEffect(() => {
    setSection("");
  }, [setSection]);

    return (
        <div className="bg-gray-100">
            <main className=" lg:px-40 md:px-4 lg:py-10">
                <div className="bg-white lg:px-17 px-3 md:px-15 py-4 lg:rounded-2xl md:rounded-2xl">
                    <div className="text-3xl flex justify-center text-gray-900 py-7">About Gangster</div>
                    <hr className="text-gray-400 py-5" />
                    <div className="text-gray-800 space-y-6">
                        <div className="space-y-2">
                            <h1 className="text-2xl text-gray-900 font-medium mb-5">About Gangster – Modern Streetwear Clothing Brand</h1>
                            <p>Gangster is a modern clothing brand offering premium streetwear and everyday fashion for men who value style, comfort, and confidence. Inspired by urban culture and contemporary Gangster, our collections are designed to deliver bold looks with effortless wearability.</p>
                            <p>From oversized t-shirts and graphic tees to casual shirts and everyday essentials, Gangster clothing is crafted using high-quality fabrics and modern fits. Each piece is created to help you express your personality while staying comfortable all day.</p>
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-2xl text-gray-900 font-medium mb-5">Premium Streetwear Designed for Everyday Wear</h1>
                            <p>At Gangster, we focus on creating stylish clothing that fits seamlessly into your daily life. Our designs combine clean silhouettes with statement details, making them perfect for casual wear, street style, and modern lifestyles.</p>
                            <p>We believe great fashion should be accessible, durable, and timeless. That’s why every Gangster collection emphasizes quality, fit, and attention to detail.</p>
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-2xl text-gay-900 font-medium mb-5 ">Why Choose Gangster Clothing?</h1>
                            <ul className="space-y-1">
                                <li className="flex space-x-2"><MdCircle size={10} className="relative -bottom-2"/><p>Trend-focused streetwear designs</p></li>
                                <li className="flex space-x-2"><MdCircle size={10} className="relative -bottom-2"/><p>Premium quality fabrics</p></li>
                                <li className="flex space-x-2"><MdCircle size={10} className="relative -bottom-2"/><p>Comfortable fits for daily use</p></li>
                                <li className="flex space-x-2"><MdCircle size={10} className="relative -bottom-2"/><p>Modern styles inspired by urban fashion</p></li>
                                <li className="flex space-x-2"><MdCircle size={10} className="relative -bottom-2"/><p>Clothing made for confidence and individuality</p></li>
                            </ul>
                        </div>
                        <div className="flex justify-center font-medium">
                            Gangster isn’t just what you wear — it’s how you show up.
                        </div>
                    </div>
                </div>
            </main>
        </ div>
    )
}
