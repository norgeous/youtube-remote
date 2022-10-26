const durationFormat = duration => {
  const s = String(~~(duration % 60)).padStart(2, '0');
  const m = String(~~(duration / 60) % 60).padStart(2, '0');
  const h = String(~~(duration / 3600) % 3600).padStart(2, '0');
  return `${h}:${m}:${s}`;
};

export default durationFormat;
