import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import EmailIcon from "@mui/icons-material/Email";

export default function Footer() {
  return (
        <footer className="border-t bg-white">
 <div className="container mx-auto max-w-7xl px-6 py-2">
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
          <p className="text-sm text-gray-500">
            © 2026 PastQuest. All rights reserved.
          </p>

           <div className="flex items-center gap-2">
            <a href="#" className="rounded-full p-2 transition hover:bg-gray-100">
              <GitHubIcon fontSize="small" />
            </a>

            <a href="#" className="rounded-full p-2 transition hover:bg-gray-100">
              <LinkedInIcon fontSize="small" />
            </a>

            <a href="#" className="rounded-full p-2 transition hover:bg-gray-100">
              <XIcon fontSize="small" />
            </a>

            <a
              href="#"
              className="rounded-full p-2 transition hover:bg-gray-100"
            >
              <EmailIcon fontSize="small" />
            </a>
          </div>
        </div>

     
         <div className="mt-2 text-center">
          <p className="text-xs text-gray-500">
            Made by <span className="font-semibold">Praise Samuel</span>
          </p>
        </div>
      </div>
    </footer>
  );
}