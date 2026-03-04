'use client';

import { ChevronLeft } from 'lucide-react';
import { applyCloudinaryOptimization } from '@/lib/imageOptimization';

export default function AllGeneralBlogsView({ blogs, onBack, onSelectBlog, shopData }) {
  // Filter general blogs (blogs without selectedCrop)
  const generalBlogs = blogs
    .filter(blog => !blog.selectedCrop)
    .sort((a, b) => {
      // Sort by date - newest first
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return dateB - dateA; // Descending order (newest first)
    });

  // Helper function to extract preview text from HTML
  const getPreviewText = (htmlContent, maxLength = 150) => {
    // Remove HTML tags
    const text = htmlContent.replace(/<[^>]*>/g, '');
    // Trim and limit length
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Helper function to extract title from blog HTML
  const getBlogTitle = (htmlContent) => {
    // Try to extract h1 first
    const h1Match = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/i);
    if (h1Match) return h1Match[1].replace(/<[^>]*>/g, '');
    
    // Try h2
    const h2Match = htmlContent.match(/<h2[^>]*>(.*?)<\/h2>/i);
    if (h2Match) return h2Match[1].replace(/<[^>]*>/g, '');
    
    // Fall back to first paragraph or first 60 chars
    const pMatch = htmlContent.match(/<p[^>]*>(.*?)<\/p>/i);
    if (pMatch) {
      const text = pMatch[1].replace(/<[^>]*>/g, '');
      return text.length > 60 ? text.substring(0, 60) + '...' : text;
    }
    
    // Last resort: first 60 chars of plain text
    const plainText = htmlContent.replace(/<[^>]*>/g, '');
    return plainText.length > 60 ? plainText.substring(0, 60) + '...' : plainText;
  };

  // Format date
  const formatDate = (blog) => {
    if (blog.createdAt) {
      return new Date(blog.createdAt).toLocaleDateString('mr-IN', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    return 'नवीनतम';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#177B3B] to-[#01582E] text-white py-4 px-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 hover:bg-white/10 px-3 py-2 rounded-xl transition bg-white/5 backdrop-blur-sm"
            data-testid="back-from-all-general-blogs-btn"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>मुख्यपृष्ठ</span>
          </button>
          <h1 className="text-xl font-bold" data-testid="all-general-blogs-title">
            सर्व कृषी माहिती
          </h1>
          <div className="w-16"></div>
        </div>
      </header>

      {/* Blog Previews Section */}
      <section className="container mx-auto px-4 py-12 flex-1">
        {generalBlogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📰</div>
            <p className="text-gray-500 text-lg mb-2">अद्याप कृषी माहिती उपलब्ध नाही</p>
            <p className="text-gray-400 text-sm">लवकरच आम्ही नवीन माहिती जोडू</p>
          </div>
        ) : (
          <div className="space-y-6">
            {generalBlogs.map(blog => {
              const title = getBlogTitle(blog.text);
              const previewText = getPreviewText(blog.text);
              const date = formatDate(blog);
              
              return (
                <div 
                  key={blog.id}
                  onClick={() => onSelectBlog(blog)}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
                  data-testid={`general-blog-preview-${blog.id}`}
                >
                  <div className="flex gap-4 p-4">
                    {/* Blog Image - Thumbnail */}
                    <div className="flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden bg-gray-100">
                      <img 
                        src={applyCloudinaryOptimization(blog.image) || 'https://via.placeholder.com/128x128?text=Blog'} 
                        alt={title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Blog Preview Content */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      {/* Title */}
                      <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-2" data-testid="blog-preview-title">
                        {title}
                      </h3>
                      
                      {/* Date */}
                      <p className="text-xs text-gray-500 mb-2" data-testid="blog-preview-date">
                        📅 {date}
                      </p>
                      
                      {/* Preview Text */}
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2" data-testid="blog-preview-text">
                        {previewText}
                      </p>
                      
                      {/* Read More Link */}
                      <div className="flex items-center text-[#177B3B] font-semibold text-sm">
                        <span>संपूर्ण वाचा</span>
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#177B3B] to-[#01582E] text-white py-8 mt-auto rounded-t-[32px]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">{shopData?.shop_name || 'Shop Name'}</h3>
            <p className="text-white/80 text-sm mb-4">{shopData?.shop_address || 'Shop Address'}</p>
            <a 
              href={`tel:${shopData?.shop_number}`}
              className="text-white hover:text-white/80 transition"
            >
              📞 {shopData?.shop_number || '0000000000'}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
