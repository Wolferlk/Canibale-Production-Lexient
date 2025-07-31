import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log(`Newsletter subscription for: ${email}`);
    setEmail('hashan.gunarathne22@gmail.com');
    alert('Thank you for subscribing!');
  };

  const footerLinks = {
    shop: [
      { name: 'New Arrivals', href: '/store' },
      { name: 'Best Sellers', href: '/store' },
      { name: 'Men', href: '/store' },
      { name: 'Women', href: '/store' },
      { name: 'Sale', href: '/store' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Story', href: '/story' },
      { name: 'Contact', href: '/contact' },
      { name: 'Admin', href: '/admin' }
    ],
    support: [
      { name: 'Privacy', href: '/privacy' },
      { name: 'Returns', href: '/returnpolicy' },
      { name: 'FAQ', href: '/faqpage' },
      { name: 'Customer Care', href: '/contact' },
      { name: 'Terms and Conditions', href: '/termandcondition' }
    ]
  };

  const socialLinks = [
    {
      name: 'Instagram',
      icon: FaInstagram,
      href: 'https://www.instagram.com/cannibal.co_/',
      color: 'hover:text-pink-500'
    },
    {
      name: 'Tiktok',
      icon: SiTiktok,
      href: 'https://www.tiktok.com/@cannibal.co?_t=ZS-8xgiNqHTIME&_r=1',
      color: 'hover:text-black'
    },
    {
      name: 'Facebook',
      icon: FaFacebook,
      href: 'https://www.facebook.com/profile.php?id=61562998396446&mibextid=wwXIfr',
      color: 'hover:text-blue-600'
    }
  ];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6 cursor-pointer">
              <img
                src="https://i.ibb.co/60zXdd1K/cannibal-logo-02.png"
                alt="CANNIBAL Logo"
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Where bold meets unique. Define your style revolution with our carefully curated collection
              of contemporary fashion pieces designed for the modern individual.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span>Suramya, Madampe, Ambalangoda, Sri Lanka</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>+94 78 289 8993</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>info@cannibalco.com</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-gray-700 ${social.color}`}
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block text-left"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block text-left"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block text-left"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-gray-400 text-sm">
              <p>2025 Cannibal. All rights reserved.</p>
              <div className="flex items-center space-x-1">
                <span>Product by</span>
                <a
                  href="https://www.lexientinnovations.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 hover:underline"
                >
                  <span>Lexient Innovations</span>
                </a>
              </div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-gray-400 text-sm">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
