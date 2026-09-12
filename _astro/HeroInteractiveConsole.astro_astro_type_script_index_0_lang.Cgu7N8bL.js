function l(){const s=document.getElementById("terminal-screen"),d=document.getElementById("terminal-form"),a=document.getElementById("terminal-input"),p=document.querySelectorAll(".term-btn");if(!s||!d||!a)return;const r={whoami:`
<div class="text-zinc-300 space-y-1">
  <div class="text-zinc-100 font-bold">WANFORGE (@wanforge)</div>
  <div class="text-zinc-400 text-[11px]">Systems Architect & Software Builder</div>
  <div class="text-zinc-400 text-[11px]">Founder of @docobyte (HealthTech SIMRS) & @src-id (BPJS RegTech)</div>
  <div class="text-zinc-500 text-[10px]">GitHub: https://github.com/wanforge &bull; Web: https://wanforge.asia</div>
</div>`,ventures:`
<div class="space-y-1.5 text-zinc-300 text-[11px]">
  <div class="p-2 border border-zinc-800 bg-zinc-950">
    <div class="flex justify-between text-zinc-100 font-bold">
      <span>1. DOCOBYTE &bull; FISIOMEDIC EMR</span>
      <a href="https://docobyte.github.io/fisiomedic/" target="_blank" class="text-emerald-400 underline">[Live Demo]</a>
    </div>
    <div class="text-zinc-400 text-[10px]">SIMRS EMR Fisioterapi Indonesia (Permenkes 65/2015, SatuSehat FHIR R4, Kuota 8-Sesi BPJS)</div>
  </div>
  <div class="p-2 border border-zinc-800 bg-zinc-950">
    <div class="flex justify-between text-zinc-100 font-bold">
      <span>2. SRC-ID &bull; FaskesShield</span>
      <a href="https://src-id.github.io/faskes-shield/" target="_blank" class="text-cyan-400 underline">[Live Demo]</a>
    </div>
    <div class="text-zinc-400 text-[10px]">Engine Pre-Audit Klaim BPJS FKTP pencegah dispute vClaim (144 Diagnosa, Fornas DB, Radar SEP >15d)</div>
  </div>
</div>`,stack:`
<div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px]">
  <div class="p-1.5 border border-zinc-800 bg-zinc-950 text-zinc-300"><strong class="text-zinc-100">Frontend:</strong> Next.js 15, Astro 5, TypeScript, Tailwind v4</div>
  <div class="p-1.5 border border-zinc-800 bg-zinc-950 text-zinc-300"><strong class="text-zinc-100">Backend:</strong> Node.js, Bun, Python FastAPI, PostgreSQL</div>
  <div class="p-1.5 border border-zinc-800 bg-zinc-950 text-zinc-300"><strong class="text-zinc-100">DevOps:</strong> Docker, Nginx Reverse Proxy, Linux Edge, CI/CD</div>
  <div class="p-1.5 border border-zinc-800 bg-zinc-950 text-zinc-300"><strong class="text-zinc-100">AI Stack:</strong> MCP Tool Servers, 9Router Gateway, Claude Code</div>
</div>`,pricing:`
<div class="space-y-1 text-[11px]">
  <div class="text-zinc-400">Pilihan Tier Rekayasa Transparan (Milestone-based):</div>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-1.5 pt-1">
    <div class="p-1.5 border border-zinc-800 bg-zinc-950"><span class="text-zinc-400">STARTER:</span> <strong class="text-zinc-100">IDR 2.5 JT</strong> <span class="text-zinc-500">/ proyek</span></div>
    <div class="p-1.5 border border-zinc-800 bg-zinc-950"><span class="text-zinc-400">GROWTH:</span> <strong class="text-zinc-100">IDR 7.5 JT</strong> <span class="text-zinc-500">/ proyek</span></div>
    <div class="p-1.5 border border-zinc-800 bg-zinc-950"><span class="text-zinc-400">SCALE:</span> <strong class="text-zinc-100">IDR 15 JT+</strong> <span class="text-zinc-500">/ proyek</span></div>
  </div>
</div>`,ping:`
<div class="space-y-1 text-[11px] text-zinc-300">
  <div class="text-emerald-400 font-bold">PINGING WANFORGE EDGE NODES...</div>
  <div class="text-zinc-400 pl-2">&bull; Edge Gateway: <span class="text-zinc-100">https://wanforge.asia</span> &rarr; HTTP/2 200 OK (Latency: 12ms)</div>
  <div class="text-zinc-400 pl-2">&bull; Docobyte Node: <span class="text-zinc-100">https://docobyte.github.io</span> &rarr; HTTP/2 200 OK (Latency: 14ms)</div>
  <div class="text-zinc-400 pl-2">&bull; SRC-ID Node: <span class="text-zinc-100">https://src-id.github.io</span> &rarr; HTTP/2 200 OK (Latency: 13ms)</div>
  <div class="text-emerald-400 font-semibold pt-0.5 pl-2">Status: 100% UP &bull; Zero Packet Loss</div>
</div>`,contact:`
<div class="space-y-1 text-[11px] text-zinc-300">
  <div>WhatsApp: <a href="https://wa.me/62816658056" target="_blank" class="text-emerald-400 underline">+62 816-658-056</a></div>
  <div>Email: <a href="mailto:contact@wanforge.asia" class="text-zinc-100 underline">contact@wanforge.asia</a></div>
  <div>GitHub: <a href="https://github.com/wanforge" target="_blank" class="text-cyan-400 underline">@wanforge</a></div>
</div>`,help:`
<div class="text-[11px] text-zinc-400 space-y-0.5">
  <div class="text-zinc-200 font-semibold">Perintah yang tersedia:</div>
  <div><strong class="text-zinc-100 font-mono">whoami</strong> &mdash; Identitas arsitek sistem & brand WANFORGE</div>
  <div><strong class="text-zinc-100 font-mono">ventures</strong> &mdash; Ekosistem @docobyte & @src-id</div>
  <div><strong class="text-zinc-100 font-mono">stack</strong> &mdash; Ringkasan arsitektur teknologi</div>
  <div><strong class="text-zinc-100 font-mono">pricing</strong> &mdash; Paket investasi software (IDR & JT)</div>
  <div><strong class="text-zinc-100 font-mono">ping</strong> &mdash; Cek latensi dan node edge</div>
  <div><strong class="text-zinc-100 font-mono">contact</strong> &mdash; Kanal komunikasi WhatsApp & email</div>
  <div><strong class="text-zinc-100 font-mono">clear</strong> &mdash; Bersihkan riwayat terminal</div>
</div>`};function o(e){const t=e.trim().toLowerCase();if(!t)return;if(t==="clear"){s.innerHTML=`
          <div class="space-y-1">
            <div class="flex items-center gap-2 text-zinc-400">
              <span class="text-zinc-100 font-bold">wanforge@edge:~$</span>
              <span class="text-emerald-400">clear</span>
            </div>
            <p class="text-zinc-500 text-[11px] pl-4">Terminal cleared. Type 'help' for commands.</p>
          </div>`;return}const n=document.createElement("div");n.className="space-y-1 pt-2 border-t border-zinc-900";const c=document.createElement("div");c.className="flex items-center gap-2 text-zinc-400",c.innerHTML=`<span class="text-zinc-100 font-bold">wanforge@edge:~$</span> <span class="text-zinc-200">${t}</span>`;const i=document.createElement("div");i.className="pl-3.5",r[t]?i.innerHTML=r[t]:i.innerHTML=`<div class="text-red-400 text-[11px]">Command not found: '${t}'. Ketik <strong class="text-zinc-200">help</strong> untuk melihat daftar perintah.</div>`,n.appendChild(c),n.appendChild(i),s.appendChild(n),s.scrollTop=s.scrollHeight}d.addEventListener("submit",e=>{e.preventDefault();const t=a.value;t&&(o(t),a.value="")}),p.forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-cmd");t&&o(t)})})}l();document.addEventListener("astro:page-load",l);
