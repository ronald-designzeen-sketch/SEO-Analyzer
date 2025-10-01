# SEO Analyzer - Design Zeen Marketing Agency

A comprehensive SEO audit web application built for Design Zeen Marketing Agency to generate leads through free SEO analysis reports.

## 🚀 Features

### Core Functionality
- **Free SEO Audit Tool** - Enter any website URL for instant analysis
- **Google PageSpeed Insights Integration** - Real-time performance scoring
- **Comprehensive Backlink Analysis** - Detailed link profile examination
- **Domain Authority Metrics** - Multiple authority scoring systems
- **PDF Report Generation** - Professional downloadable reports
- **Lead Capture System** - Contact form integration for potential clients

### SEO Analysis Includes
- **Performance Metrics**
  - Desktop & Mobile PageSpeed scores
  - Core Web Vitals analysis
  
- **Technical SEO**
  - SSL certificate verification
  - Mobile-friendly testing
  - Page title optimization
  - Meta description analysis
  - H1 tag structure
  - Image alt text coverage

- **Backlink Profile Analysis**
  - Total backlinks count
  - Referring domains analysis
  - DoFollow vs NoFollow ratio
  - New/Lost backlinks (30-day tracking)
  - Top referring domains list

- **Domain Authority Metrics**
  - Domain Rating (Ahrefs style, 0-100)
  - Domain Authority (Moz style, 0-100)
  - Trust Flow (Majestic style, 0-100)
  - Citation Flow (Majestic style, 0-100)

- **Organic Performance**
  - Estimated monthly organic traffic
  - Organic keywords count
  - Traffic trend analysis

### Smart Recommendations
- Performance optimization suggestions
- Technical SEO improvements
- Backlink building strategies
- Domain authority enhancement tips
- Content optimization recommendations

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Form Handling**: React Hook Form with Zod validation
- **PDF Generation**: jsPDF
- **API Integration**: Google PageSpeed Insights API
- **Database**: SQLite (configurable for PostgreSQL/Firebase)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ronald-designzeen-sketch/SEO-Analyzer.git
   cd SEO-Analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables:
   ```env
   # Google PageSpeed Insights API Key (optional - uses mock data if not provided)
   GOOGLE_PAGESPEED_API_KEY=your_api_key_here
   
   # Database URL (optional - uses SQLite by default)
   DATABASE_URL=your_database_url_here
   
   # SEO API Keys (optional - uses intelligent mock data if not provided)
   AHREFS_API_KEY=your_ahrefs_key
   MOZ_API_KEY=your_moz_key
   SEMRUSH_API_KEY=your_semrush_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── generate-pdf/     # PDF report generation
│   │   ├── leads/           # Lead capture API
│   │   └── seo-audit/       # Main SEO analysis API
│   ├── results/             # Results page
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/
│   ├── Dashboard.tsx        # Results dashboard
│   ├── Header.tsx           # Site header
│   ├── Footer.tsx           # Site footer
│   ├── LeadCapture.tsx      # Contact form
│   ├── ScoreIndicator.tsx   # Score visualization
│   └── URLForm.tsx          # URL input form
├── services/
│   └── backlinkService.ts   # Backlink analysis service
├── types/
│   ├── seo.ts              # SEO data types
│   └── pagespeed.ts        # PageSpeed API types
└── utils/
    └── urlProcessor.ts     # URL validation & processing
```

## 🔧 Configuration

### API Integration

The application supports multiple SEO API providers:

1. **Google PageSpeed Insights** (Performance data)
2. **Ahrefs API** (Backlink data)
3. **Moz API** (Domain Authority)
4. **SEMrush API** (Comprehensive SEO data)
5. **Majestic API** (Trust/Citation Flow)

### Intelligent Mock Data

When API keys are not available, the application generates realistic mock data based on:
- Domain characteristics analysis
- Website type detection (ecommerce, blog, news, etc.)
- Domain age estimation
- Industry-specific patterns

## 📊 Backlink Analysis Features

### Domain Intelligence
The backlink service analyzes domains to provide realistic data:

- **Popular Domains**: Google, Facebook, Amazon, etc. (high authority scores)
- **E-commerce Sites**: Shopping-related domains (moderate-high authority)
- **Blog/News Sites**: Content-focused domains (variable authority)
- **Government/Educational**: .gov/.edu domains (very high authority)

### Metrics Provided
- Total backlinks with realistic distribution
- Referring domains count
- DoFollow/NoFollow ratio analysis
- Monthly backlink growth/loss tracking
- Top referring domains list
- Domain authority scores across multiple systems

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach
- **Professional Styling**: Clean, modern interface
- **Traffic Light System**: Green/Orange/Red indicators for quick assessment
- **Interactive Dashboard**: Comprehensive results visualization
- **PDF Export**: Professional report generation
- **Lead Capture**: Integrated contact forms

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Docker
```bash
docker build -t seo-analyzer .
docker run -p 3000:3000 seo-analyzer
```

### Manual Deployment
```bash
npm run build
npm start
```

## 📈 Lead Generation Strategy

The application serves as a lead generation funnel:

1. **Free Value**: Comprehensive SEO audit
2. **Professional Presentation**: Detailed reports and insights
3. **Clear CTA**: Contact form for improvement services
4. **Agency Branding**: Design Zeen Marketing Agency integration
5. **Follow-up**: Email capture for nurturing campaigns

## 🔮 Future Enhancements

- **Real-time API Integration**: Connect to live SEO APIs
- **Historical Tracking**: Store and compare audit results over time
- **Competitor Analysis**: Compare against competitor websites
- **Advanced Charts**: Interactive data visualizations
- **Email Automation**: Automated report delivery
- **CRM Integration**: Direct lead pipeline integration
- **White-label Options**: Customizable branding for agencies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Design Zeen Marketing Agency**
- Email: info@designzeen.com
- Website: [designzeen.com](https://designzeen.com)

## 🙏 Acknowledgments

- Google PageSpeed Insights API
- Next.js team for the amazing framework
- TailwindCSS for the utility-first CSS framework
- The open-source community for various tools and libraries

---

Built with ❤️ by Design Zeen Marketing Agency

