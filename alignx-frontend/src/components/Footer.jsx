import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer
      className="border-t mt-20"
      style={{
        backgroundColor: "var(--color-darker-bg)",
        borderColor: "rgb(255 255 255 / 0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3
              className="font-bold text-lg mb-4 bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(to right, #0ea5e9, #06b6d4)",
              }}
            >
              AlignX
            </h3>
            <p className="text-white/60 text-sm">Advanced AI-powered posture tracking for better health.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Security
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: "rgb(255 255 255 / 0.1)" }}
        >
          <p className="text-white/60 text-sm">© 2026 AlignX. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
