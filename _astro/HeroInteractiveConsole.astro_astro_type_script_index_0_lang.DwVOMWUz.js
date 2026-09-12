function l(){const s=document.getElementById("terminal-screen"),r=document.getElementById("terminal-form"),n=document.getElementById("terminal-input"),p=document.querySelectorAll(".term-btn");if(!s||!r||!n)return;const d={whoami:`
        <div class="space-y-1 text-zinc-300 text-[11px]">
          <div><strong class="text-zinc-100">IDENTITY:</strong> WANFORGE (<a href="https://github.com/wanforge" target="_blank" class="text-emerald-400 underline">@wanforge</a>)</div>
          <div><strong class="text-zinc-100">ROLE:</strong> Systems Architect & Software Builder</div>
          <div><strong class="text-zinc-100">FOUNDER:</strong> <a href="https://github.com/docobyte" target="_blank" class="text-emerald-400 underline">@docobyte</a> (HealthTech EMR) & <a href="https://github.com/src-id" target="_blank" class="text-cyan-400 underline">@src-id</a> (BPJS Claim Defense)</div>
          <div><strong class="text-zinc-100">SPECIALTY:</strong> Healthcare interoperability (FHIR R4), BPJS claim validation, and edge-native distributed architectures.</div>
        </div>
      `,ventures:`
        <div class="space-y-2 text-zinc-300 text-[11px]">
          <div class="border-l-2 border-emerald-500 pl-2">
            <span class="text-emerald-400 font-bold">1. DOCOBYTE FISIOMEDIC EMR</span>
            <p class="text-zinc-400 text-[10px]">Indonesian Physical Therapy SIMRS PMK 65/2015 & PMK 24/2022. SatuSehat FHIR R4 interop, 8-session BPJS quota tracker. 28/28 passing unit tests.</p>
            <div class="flex gap-3 text-[10px] mt-1">
              <a href="https://docobyte.github.io/fisiomedic/" target="_blank" class="text-emerald-400 underline">Demo: docobyte.github.io/fisiomedic ↗</a>
              <a href="https://github.com/docobyte/fisiomedic" target="_blank" class="text-zinc-400 underline">Repo ↗</a>
            </div>
          </div>
          <div class="border-l-2 border-cyan-500 pl-2">
            <span class="text-cyan-400 font-bold">2. SRC-ID FaskesShield</span>
            <p class="text-zinc-400 text-[10px]">Real-time FKTP claim dispute radar. Detects 144 non-specialist diagnoses, prescription polypharmacy, and expired SEP windows before submission.</p>
            <div class="flex gap-3 text-[10px] mt-1">
              <a href="https://src-id.github.io/faskes-shield/" target="_blank" class="text-cyan-400 underline">Demo: src-id.github.io/faskes-shield ↗</a>
              <a href="https://github.com/src-id/src-faskes-shield" target="_blank" class="text-zinc-400 underline">Repo ↗</a>
            </div>
          </div>
        </div>
      `,github:`
        <div class="space-y-1.5 text-zinc-300 text-[11px]">
          <div><strong class="text-zinc-100">OFFICIAL GITHUB ORGS & REPOS:</strong></div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px]">
            <div class="p-1.5 border border-zinc-800 bg-zinc-900/60">
              <span class="text-zinc-100 font-bold block">@wanforge (Principal)</span>
              <a href="https://github.com/wanforge" target="_blank" class="text-emerald-400 underline">github.com/wanforge ↗</a>
            </div>
            <div class="p-1.5 border border-zinc-800 bg-zinc-900/60">
              <span class="text-zinc-100 font-bold block">@docobyte (HealthTech)</span>
              <a href="https://github.com/docobyte" target="_blank" class="text-emerald-400 underline">github.com/docobyte ↗</a>
            </div>
            <div class="p-1.5 border border-zinc-800 bg-zinc-900/60">
              <span class="text-zinc-100 font-bold block">@src-id (BPJS RegTech)</span>
              <a href="https://github.com/src-id" target="_blank" class="text-cyan-400 underline">github.com/src-id ↗</a>
            </div>
            <div class="p-1.5 border border-zinc-800 bg-zinc-900/60">
              <span class="text-zinc-100 font-bold block">@wanforge/wanforge.asia</span>
              <span class="text-zinc-400">Open Core Architecture</span>
            </div>
          </div>
        </div>
      `,stack:`
        <div class="space-y-1 text-zinc-300 text-[11px]">
          <div><strong class="text-zinc-100">PRODUCTION CORE:</strong> Next.js 15, TypeScript, Astro 5, Bun, Tailwind CSS v4 (RizzUI)</div>
          <div><strong class="text-zinc-100">DATA & CLOUD:</strong> PostgreSQL, Docker, Nginx, Cloudflare Edge, GitHub Pages, Linux VPS</div>
          <div><strong class="text-zinc-100">PROTOCOLS:</strong> HL7 FHIR R4 (Kemenkes SatuSehat), BPJS vClaim TrustMark, REST, MCP</div>
          <div><strong class="text-zinc-100">AI AGENTS:</strong> Model Context Protocol (MCP), 9Router Gateway, Claude Code workflows</div>
        </div>
      `,pricing:`
        <div class="space-y-1 text-zinc-300 text-[11px]">
          <div><strong class="text-zinc-100">1. STARTER ARCHITECTURE:</strong> <span class="text-emerald-400 font-bold">IDR 2.5 JT / project</span> (1-2 weeks, high-perf static site/MVP, CI/CD, SEO)</div>
          <div><strong class="text-zinc-100">2. GROWTH FULL-STACK:</strong> <span class="text-emerald-400 font-bold">IDR 7.5 JT / project</span> (2-4 weeks, web app, PostgreSQL, Auth RBAC, Docker)</div>
          <div><strong class="text-zinc-100">3. SCALE & REGULATED:</strong> <span class="text-emerald-400 font-bold">IDR 15 JT+ / project</span> (4-8 weeks, EMR, BPJS claim engine, distributed edge)</div>
          <div class="text-zinc-500 text-[10px]">Zero agency markup. Direct execution with the principal systems architect.</div>
        </div>
      `,ping:`
        <div class="space-y-1 text-zinc-300 text-[11px]">
          <div class="text-emerald-400 font-bold">PING TO EDGE GATEWAY:</div>
          <div>64 bytes from wanforge.asia (Cloudflare SIN): icmp_seq=1 ttl=58 time=12.4 ms</div>
          <div>64 bytes from docobyte.github.io: icmp_seq=2 ttl=58 time=14.1 ms</div>
          <div>64 bytes from src-id.github.io: icmp_seq=3 ttl=58 time=13.8 ms</div>
          <div class="text-zinc-400 text-[10px]">Status: 200 OK · Roundtrip latency nominal · Zero packet loss.</div>
        </div>
      `,contact:`
        <div class="space-y-1 text-zinc-300 text-[11px]">
          <div><strong class="text-zinc-100">WHATSAPP:</strong> <a href="https://wa.me/62816658056" target="_blank" class="text-emerald-400 underline">+62 816-658-056</a> (Direct Architect Line)</div>
          <div><strong class="text-zinc-100">EMAIL:</strong> <a href="mailto:contact@wanforge.asia" class="text-zinc-300 underline">contact@wanforge.asia</a></div>
          <div><strong class="text-zinc-100">GITHUB:</strong> <a href="https://github.com/wanforge" target="_blank" class="text-emerald-400 underline">github.com/wanforge</a></div>
        </div>
      `,help:`
        <div class="space-y-1 text-zinc-300 text-[11px]">
          <div>Available commands:</div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-1 text-[10px] text-zinc-400 pt-1">
            <div><strong class="text-emerald-400">whoami</strong> - Systems architect bio</div>
            <div><strong class="text-emerald-400">ventures</strong> - Docobyte & SRC-ID</div>
            <div><strong class="text-emerald-400">github</strong> - Official repos & orgs</div>
            <div><strong class="text-emerald-400">stack</strong> - Production tech stack</div>
            <div><strong class="text-emerald-400">pricing</strong> - Pricing in IDR ... JT</div>
            <div><strong class="text-emerald-400">ping</strong> - Edge latency test</div>
            <div><strong class="text-emerald-400">contact</strong> - Direct WhatsApp/Email</div>
            <div><strong class="text-emerald-400">clear</strong> - Clear console</div>
          </div>
        </div>
      `};function o(e){const t=e.trim().toLowerCase();if(!t)return;if(t==="clear"){s.innerHTML=`
          <div class="space-y-1">
            <div class="flex items-center gap-2 text-zinc-400">
              <span class="text-zinc-100 font-bold">wanforge@edge:~$</span>
              <span class="text-emerald-400">clear</span>
            </div>
            <p class="text-zinc-500 text-[11px] pl-4">Terminal cleared. Type 'help' for commands.</p>
          </div>`;return}const i=document.createElement("div");i.className="space-y-1 pt-2 border-t border-zinc-900";const c=document.createElement("div");c.className="flex items-center gap-2 text-zinc-400",c.innerHTML=`<span class="text-zinc-100 font-bold">wanforge@edge:~$</span> <span class="text-zinc-200">${t}</span>`;const a=document.createElement("div");a.className="pl-3.5",d[t]?a.innerHTML=d[t]:a.innerHTML=`<div class="text-red-400 text-[11px]">Command not found: '${t}'. Type <strong class="text-zinc-200">help</strong> for available commands.</div>`,i.appendChild(c),i.appendChild(a),s.appendChild(i),s.scrollTop=s.scrollHeight}r.addEventListener("submit",e=>{e.preventDefault();const t=n.value;t&&(o(t),n.value="")}),p.forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-cmd");t&&o(t)})})}l();document.addEventListener("astro:page-load",l);
