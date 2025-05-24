'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Facebook, Twitter, Instagram, Link, Copy, Check } from 'lucide-react';
import { fetchApi } from '@/lib/api';

interface SocialSharingProps {
  productId: string;
  productName: string;
  productUrl: string;
}

export default function SocialSharing({ productId, productName, productUrl }: SocialSharingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [referralCode, setReferralCode] = useState('');

  async function generateReferralCode() {
    try {
      const data = await fetchApi<{ code: string }>(`/products/${productId}/referral`, {
        method: 'POST'
      });
      setReferralCode(data.code);
    } catch (error) {
      console.error('Failed to generate referral code:', error);
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(productName)}&url=${encodeURIComponent(productUrl)}`,
    instagram: `https://www.instagram.com/share?url=${encodeURIComponent(productUrl)}`
  };

  return (
    <div className="relative">
      {/* Share Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!referralCode) {
            generateReferralCode();
          }
        }}
        className="flex items-center gap-2 px-4 py-2 bg-[#2E2E2E] rounded-lg hover:bg-[#3E3E3E]"
      >
        <Share2 className="w-5 h-5" />
        <span>Share</span>
      </button>

      {/* Share Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="absolute right-0 mt-2 w-80 bg-[#1F1F1F] rounded-lg shadow-xl z-50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="p-4 border-b border-gray-700">
                <h3 className="font-semibold mb-4">Share Product</h3>
                
                {/* Social Media Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={shareLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-3 bg-[#2E2E2E] rounded-lg hover:bg-[#3E3E3E]"
                  >
                    <Facebook className="w-6 h-6 text-blue-400" />
                    <span className="text-xs mt-1">Facebook</span>
                  </a>
                  <a
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-3 bg-[#2E2E2E] rounded-lg hover:bg-[#3E3E3E]"
                  >
                    <Twitter className="w-6 h-6 text-blue-300" />
                    <span className="text-xs mt-1">Twitter</span>
                  </a>
                  <a
                    href={shareLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-3 bg-[#2E2E2E] rounded-lg hover:bg-[#3E3E3E]"
                  >
                    <Instagram className="w-6 h-6 text-pink-400" />
                    <span className="text-xs mt-1">Instagram</span>
                  </a>
                </div>
              </div>

              {/* Referral Link */}
              <div className="p-4">
                <h4 className="text-sm font-medium mb-2">Referral Link</h4>
                <div className="flex items-center gap-2">
                  <div className="flex-1 p-2 bg-[#2E2E2E] rounded text-sm truncate">
                    {referralCode ? `${productUrl}?ref=${referralCode}` : 'Generating...'}
                  </div>
                  <button
                    onClick={() => copyToClipboard(`${productUrl}?ref=${referralCode}`)}
                    className="p-2 hover:bg-[#2E2E2E] rounded"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Share this link and earn rewards when friends make a purchase!
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
} 