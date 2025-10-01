import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DZ</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Design Zeen</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium">
              SEO Audit
            </Link>
            <a 
              href="mailto:info@designzeen.com" 
              className="text-gray-700 hover:text-primary-600 font-medium"
            >
              Contact
            </a>
            <a 
              href="mailto:info@designzeen.com" 
              className="btn-primary"
            >
              Get Started
            </a>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <a 
              href="mailto:info@designzeen.com" 
              className="btn-primary text-sm py-2 px-4"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

