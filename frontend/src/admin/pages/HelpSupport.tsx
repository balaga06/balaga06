import { Mail, Phone, AlertCircle, LifeBuoy } from "lucide-react";

export default function HelpSupport() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      
      {/* Page Title */}
      <div className="flex items-center gap-3 mb-6">
        <LifeBuoy className="w-7 h-7 text-[#0b1b2b]" />
        <h1 className="text-3xl font-bold text-[#0b1b2b]">
          Help & Support
        </h1>
      </div>

      <p className="text-gray-600 mb-10 max-w-3xl">
        This section provides assistance related to system usage, admin access,
        data management, and technical issues within the IQAC portal.
      </p>

      {/* Common Issues */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-[#b8963f]" />
          Common Issues
        </h2>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Unable to login to the admin panel</li>
          <li>Incorrect username or password</li>
          <li>Data not saving or updating</li>
          <li>Documents not visible after upload</li>
          <li>Permission or access-related issues</li>
        </ul>
      </section>

      {/* Support Guidelines */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Support Guidelines</h2>
        <p className="text-gray-700 leading-relaxed max-w-4xl">
          Ensure valid login credentials are used. Refresh the page or re-login
          if the session expires. For persistent issues, contact the support
          team with proper details such as user role, module name, and error
          message.
        </p>
      </section>

      {/* Contact Support */}
      <section className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Contact Support</h2>

        <div className="space-y-3 text-gray-700">
          <p className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#0b1b2b]" />
            <span>
              Email: <strong>support@jntuk.edu.in</strong>
            </span>
          </p>

          <p className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#0b1b2b]" />
            <span>
              Working Hours: <strong>Monday – Friday (9:00 AM – 5:00 PM)</strong>
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
