import { FileUpload } from "./FileUpload";

export function Header({ onFileUpload }: { onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void; }) {
  return (
    <div className="rounded-3xl p-[2px] bg-gradient-to-b from-white/20 to-white/5 shadow-2xl">
      <header className="w-full h-full rounded-[1.4rem] bg-white/10 backdrop-blur-xl p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Crystal Archive</h1>
              <p className="text-sm text-gray-300">See through to what you seek</p>
            </div>
          </div>
          <div className="w-full sm:w-auto">
            <FileUpload onFileUpload={onFileUpload}>
              <button className="w-full sm:w-auto border-2 border-dashed border-white/30 rounded-xl px-6 py-3 text-sm font-semibold flex items-center justify-center space-x-2 hover:bg-white/10 transition-colors duration-300 focus:bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                <span>Drop files here</span>
              </button>
            </FileUpload>
          </div>
        </div>
      </header>
    </div>
  );
}