'use client';

export default function DelayPopup({ isOpen, onClose, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const reason = formData.get('reason');
    const minutes = parseInt(formData.get('minutes'), 10);
    onSubmit(reason, minutes);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="card w-full max-w-md m-4 bg-gray-900/95 border border-white/10">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4">Add Delay</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white/70 mb-2" htmlFor="reason">
                Delay Reason
              </label>
              <input
                type="text"
                id="reason"
                name="reason"
                className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-white/50"
                placeholder="e.g., Doctor delayed"
                defaultValue="Doctor delayed"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm text-white/70 mb-2" htmlFor="minutes">
                Delay Duration (minutes)
              </label>
              <input
                type="number"
                id="minutes"
                name="minutes"
                min="1"
                max="60"
                className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white"
                defaultValue="10"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1"
            >
              Add Delay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
