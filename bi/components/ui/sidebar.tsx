import Link from "next/link";

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white text-black border-r border-gray-200 p-4 transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">📊 MBI Dashboard</h2>
      <nav className="flex flex-col space-y-2">
        <Link href="/" className="py-2 px-4 rounded-lg hover:bg-gray-100">🏠 ダッシュボード</Link>
        <Link href="/upload" className="py-2 px-4 rounded-lg hover:bg-gray-100">📂 データアップロード</Link>
        <Link href="/report" className="py-2 px-4 rounded-lg hover:bg-gray-100">📈 レポート</Link>
        <Link href="/settings" className="py-2 px-4 rounded-lg hover:bg-gray-100">⚙ 設定</Link>
      </nav>

      {/* ✅ モバイル用の閉じるボタン */}
      <button onClick={onClose} className="md:hidden mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900">
        ✖ 閉じる
      </button>
    </div>
  );
}
