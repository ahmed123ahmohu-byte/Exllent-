import { motion } from 'framer-motion';

export default function CodePreviewPanel({ previewDoc }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass h-[40vh] rounded-[24px] p-3 md:h-[75vh]"
    >
      <div className="mb-2 flex items-center justify-between px-2 text-sm text-cyan-200">
        <span>Live Preview</span>
        <span className="rounded-full bg-cyan-400/20 px-3 py-1">Nexa Code Mode</span>
      </div>
      <iframe title="preview" className="h-[calc(100%-34px)] w-full rounded-2xl bg-white" srcDoc={previewDoc} />
    </motion.div>
  );
}
