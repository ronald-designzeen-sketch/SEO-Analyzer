# SEO Analyzer - Design Zeen Marketing Agency

A comprehensive SEO Audit Web App that provides instant website analysis and serves as a lead generation tool for Design Zeen Marketing Agency.

## Features

### 🔍 SEO Analysis
- **Performance Metrics**: Desktop and mobile page speed scores via Google PageSpeed Insights API
- **Technical SEO**: SSL certificate, mobile-friendly check, title tags, meta descriptions, H1 analysis
- **Content Analysis**: Image alt text optimization, heading structure
- **Link Profile**: Backlink and referring domain estimates (with mock data, upgradeable to real APIs)

### 📊 Professional Dashboard
- Visual score indicators with traffic light system (green/orange/red)
- Comprehensive recommendations with priority levels
- Clean, modern UI with TailwindCSS
- Responsive design for all devices

### 📄 PDF Reports
- Downloadable professional SEO audit reports
- Agency branding and contact information
- Detailed analysis and recommendations

### 🎯 Lead Generation
- Professional contact form with validation
- Lead capture after audit completion
- Agency contact information and CTAs
- Email integration ready

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Form Handling**: React Hook Form with Zod validation
- **PDF Generation**: jsPDF
- **HTML Parsing**: Cheerio
- **API Integration**: Google PageSpeed Insights

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ronald-designzeen-sketch/SEO-Analyzer.git
cd SEO-Analyzer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. (Optional) Add your Google PageSpeed Insights API key to `.env.local`:
```
GOOGLE_PAGESPEED_API_KEY=your_api_key_here
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Configuration

### Google PageSpeed Insights API (Optional)
- Get your API key from [Google Cloud Console](https://developers.google.com/speed/docs/insights/v5/get-started)
- Add it to your `.env.local` file
- If no API key is provided, the app uses mock data for demonstration

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── generate-pdf/     # PDF report generation
│   │   ├── leads/            # Lead form submission
│   │   └── seo-audit/        # Main SEO analysis
│   ├── results/              # Results page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page
├── components/
│   ├── Dashboard.tsx         # Results dashboard
│   ├── Footer.tsx            # Site footer
│   ├── Header.tsx            # Site header
│   ├── Hero.tsx              # Landing page hero
│   ├── LeadCapture.tsx       # Lead generation form
│   ├── ScoreIndicator.tsx    # Performance score display
│   └── URLForm.tsx           # URL input form
├── types/
│   ├── pagespeed.ts          # PageSpeed API types
│   └── seo.ts                # SEO analysis types
└── utils/                    # Utility functions
```

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Customization

### Branding
- Update agency information in `src/components/Header.tsx` and `src/components/Footer.tsx`
- Modify colors in `tailwind.config.js`
- Replace logo and contact information

### Features
- Add real backlink APIs (Moz, SEMrush, Ahrefs)
- Implement database storage for leads
- Add email notifications
- Integrate with CRM systems

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary to Design Zeen Marketing Agency.

## Support

For support or questions, contact:
- Email: info@designzeen.com
- Website: [Design Zeen Marketing Agency](https://designzeen.com)

---

Built with ❤️ by Design Zeen Marketing Agency

