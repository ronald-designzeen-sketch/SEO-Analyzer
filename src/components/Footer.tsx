export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DZ</span>
              </div>
              <span className="text-xl font-bold">Design Zeen Marketing Agency</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Professional SEO and digital marketing services to help your business grow online. 
              Get expert analysis and actionable recommendations.
            </p>
            <div className="flex space-x-4">
              <a 
                href="mailto:info@designzeen.com" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="mailto:info@designzeen.com" className="hover:text-white transition-colors">SEO Audit</a></li>
              <li><a href="mailto:info@designzeen.com" className="hover:text-white transition-colors">Technical SEO</a></li>
              <li><a href="mailto:info@designzeen.com" className="hover:text-white transition-colors">Content Strategy</a></li>
              <li><a href="mailto:info@designzeen.com" className="hover:text-white transition-colors">Link Building</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="mailto:info@designzeen.com" className="hover:text-white transition-colors">
                  info@designzeen.com
                </a>
              </li>
              <li>Free SEO Consultation</li>
              <li>Professional Analysis</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Design Zeen Marketing Agency. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="mailto:info@designzeen.com" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="mailto:info@designzeen.com" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

