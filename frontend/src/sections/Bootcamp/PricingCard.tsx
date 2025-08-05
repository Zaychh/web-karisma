import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface PricingPlan {
  name: string;
  price: number;
  originalPrice?: number;
  benefits?: string[];
  // Tambahan data yang dibutuhkan untuk payment
  program_id?: number;
  slug?: string;
}

interface PricingCardProps {
  plan: PricingPlan;
  onClick?: (paymentData: {
    title: string;
    price: number;
    program_id: number;
    slug: string;
  }) => void;
}

export default function PricingCard({ plan, onClick }: PricingCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(plan.price);

  const formattedOriginal = plan.originalPrice
    ? new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(plan.originalPrice)
    : null;

  const handleDaftar = () => {
    // Pastikan semua data yang dibutuhkan ada
    if (!plan.program_id || !plan.slug) {
      console.error('❌ Missing required data:', {
        program_id: plan.program_id,
        slug: plan.slug
      });
      alert('Data program tidak lengkap. Silakan refresh halaman.');
      return;
    }

    // Kirim data lengkap ke parent
    onClick?.({
      title: plan.name,
      price: plan.price,
      program_id: plan.program_id,
      slug: plan.slug
    });
  };

  return (
    <div className="bg-irreng text-white px-8 py-6 rounded-2xl border border-white w-[380px] flex flex-col h-full">
      <div className="flex flex-col flex-1 justify-between">
        {/* Header */}
        <div className="mb-6 min-h-[120px] flex flex-col justify-between">
          <h4 className="text-3xl font-bold text-rosegold mb-3">{plan.name}</h4>

          {formattedOriginal &&
            plan.originalPrice !== undefined &&
            plan.originalPrice > plan.price && (
              <div className="flex items-center gap-2 mb-1">
                <span className="line-through text-sm text-gray-400">
                  {formattedOriginal}
                </span>
                <span className="text-red-500 text-xs bg-white px-2 py-0.5 rounded-md font-bold">
                  {Math.round(
                    ((plan.originalPrice - plan.price) / plan.originalPrice) *
                      100
                  )}
                  %
                </span>
              </div>
            )}

          <p className="text-3xl font-bold">{formattedPrice}</p>
        </div>

        {/* Button */}
        <div className="mb-6">
          <button
            onClick={handleDaftar}
            className="bg-white text-black text-xl w-full py-3 rounded-xl font-semibold hover:bg-gray-200 transition cursor-pointer"
          >
            Daftar Sekarang!
          </button>
        </div>

        {/* Benefit */}
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex justify-between items-center w-full text-sm text-gray-300 cursor-pointer"
          >
            Benefit
            <span className="cursor-pointer">
              {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </button>

          {isOpen && (
            <ul className="mt-3 pl-4 text-lg space-y-2 min-h-[24px]">
              {plan.benefits?.map((item, idx) => (
                <li key={idx} className="text-white relative pl-4">
                  <span className="absolute left-0 top-1.5 w-2 h-2 bg-green-400 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}