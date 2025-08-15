import {  Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Image from "next/image"

export function FooterSection() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 ">
      <div className="  px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image alt="logo" src={'/icons/logo.png'} width={24} height={24}/>
              <span className="text-xl font-semibold text-gray-900">Reppoo</span>
            </div>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              An innovative health assistant app that leverages artificial intelligence to provide personalized and
              wellness recommendations.
            </p>
            <p className="text-sm text-gray-600">hello@reppoo.com</p>
          </div>

          {/* Company Links */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Early Access
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  404
                </a>
              </li>
            </ul>
          </div>

          {/* App Links */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">App</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Download For iOS
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Download For Android
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Pages */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Legal Pages</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-gray-200">           
  <p className="text-sm text-gray-600 mb-4 md:mb-0">© Copyright reppoo</p>            
  {/* Social Media Icons */}           
  <div className="flex items-center gap-4">             
    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors border border-gray-300 rounded-xl p-2">               
      <Facebook className="w-5 h-5" />             
    </a>             
    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors border border-gray-300 rounded-xl p-2">               
      <Twitter className="w-5 h-5" />             
    </a>             
    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors border border-gray-300 rounded-xl p-2">               
      <Instagram className="w-5 h-5" />             
    </a>             
    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors border border-gray-300 rounded-xl p-2">               
      <Linkedin className="w-5 h-5" />             
    </a>           
  </div>         
</div>
      </div>
    </footer>
  )
}
