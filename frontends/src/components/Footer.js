import React from 'react'

export default function Footer() {
    return (
        <>
            <footer className="text-gray-400 py-6 px-4">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start">
                    <div>
                        <p className="text-sm text-center md:text-left">
                            © 2025 DropDock. All rights reserved. Secure, fast, and easy PDF storage.
                        </p>
                        <p className="text-sm text-center md:text-left">
                            Developed with passion by <a href="https://www.linkedin.com/in/md-faizan973/" className="text-blue-400 hover:text-blue-500 transition">Md Faizan</a>. Connect on LinkedIn to collaborate and explore innovative ideas.
                        </p>

                    </div>
                    <div className="flex space-x-4 mt-2 md:mt-0">
                        <a href="#" className="hover:text-gray-200 transition">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-200 transition">Terms of Service</a>
                        <a href="#" className="hover:text-gray-200 transition">Contact Us</a>
                    </div>
                </div>
            </footer></>
    )
}
