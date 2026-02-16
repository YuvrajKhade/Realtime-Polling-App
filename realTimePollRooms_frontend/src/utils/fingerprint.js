export const generateFingerPrint = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.textBaseline = "top";
  ctx.font = "14px Arial";
  ctx.fillText("fingerprint", 2, 2);

  const canvasData = canvas.toDataURL();

  const screen = `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const lang = navigator.language;

  const data = `${canvasData}-${screen}-${timeZone}-${lang}`;
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  let voterId=localStorage.getItem('voterId')
  if(!voterId){
    voterId=`fp_${Math.abs(hash)}_${Date.now()}`
    localStorage.setItem('voterId',voterId);
  }

  return voterId;
};
