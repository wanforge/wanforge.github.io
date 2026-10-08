import{j as e}from"./reducedMotion.0FZaeWZX.js";import{r as h}from"./index.DYrVU9rO.js";import{c as g}from"./cn.4perknFd.js";import{c as S,m as j}from"./proxy.BAqHx0-z.js";import{A as D}from"./index.CDutIMox.js";import{H as T,g as A,b as N,c as C,d as I,e as M,f as P,L as B}from"./Card.BPYnzy-o.js";import{L as w}from"./Link.D6vi95_s.js";import{R as v}from"./paths.CxsjXzMa.js";import{A as O}from"./arrow-right.BWJ5Dh2J.js";/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],E=S("calendar",L);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],q=S("clock",W),f=[{id:"alex-chen",name:"Alexandra Chen",role:"CEO & Co-Founder",avatar:"/images/team/person-19.jpg",bio:"Alexandra is the CEO and co-founder of ModernSaaS. She writes about product strategy, leadership, and the future of work.",social:{twitter:"https://twitter.com/alexchen",linkedin:"https://linkedin.com/in/alexchen"}},{id:"marcus-johnson",name:"Marcus Johnson",role:"CTO & Co-Founder",avatar:"/images/team/person-20.jpg",bio:"Marcus leads engineering at ModernSaaS. He's passionate about distributed systems, scalability, and developer experience.",social:{twitter:"https://twitter.com/marcusj",linkedin:"https://linkedin.com/in/marcusj"}},{id:"sarah-mitchell",name:"Sarah Mitchell",role:"Lead Engineer",avatar:"/images/team/person-21.jpg",bio:"Sarah is a lead engineer focused on frontend architecture and performance. She contributes to open source and writes about modern web development.",social:{twitter:"https://twitter.com/sarahcodes",linkedin:"https://linkedin.com/in/sarahmitchell"}},{id:"emily-rodriguez",name:"Emily Rodriguez",role:"Head of Marketing",avatar:"/images/team/person-22.jpg",bio:"Emily leads growth and marketing at ModernSaaS. She writes about SaaS marketing, growth strategies, and customer success.",social:{twitter:"https://twitter.com/emilyr",linkedin:"https://linkedin.com/in/emilyr"}}],F={id:"1",slug:"introducing-modern-saas-2-0",title:"Introducing ModernSaaS 2.0: The Future of Team Collaboration",excerpt:"We're excited to announce the biggest update in our history. ModernSaaS 2.0 brings AI-powered features, real-time collaboration, and a completely redesigned interface.",category:"announcements",author:f[0],publishedAt:"2026-02-01",readingTime:5,featured:!0,coverImage:"/images/tech-01.jpg",tags:["product","announcement","AI","collaboration"],relatedPosts:["2","3"],content:`
    <p>Today marks a major milestone for ModernSaaS. After months of hard work and thousands of hours of development, we're finally ready to share <strong>ModernSaaS 2.0</strong> with the world.</p>
    
    <p>When we first launched, our goal was simple: help teams work better together. But as the world of work evolved, we realized that simple collaboration wasn't enough anymore. Teams need more than just a place to talk; they need intelligent systems that anticipate their needs, automate their repetitive tasks, and provide deep insights into their projects.</p>
    
    <h2>What's New in 2.0?</h2>
    
    <p>ModernSaaS 2.0 isn't just a UI update. We've rebuilt the core engine from the ground up to support a new generation of features:</p>
    
    <ul>
      <li><strong>AI-Powered Task Automation:</strong> Our new AI agent can automatically categorize tasks, assign them to the right team members, and even suggest deadlines based on past performance.</li>
      <li><strong>Real-time Multiplayer Collaboration:</strong> Experience seamless, sub-50ms latency when working on documents and project boards with your team.</li>
      <li><strong>Advanced Analytics Dashboard:</strong> Get a bird's-eye view of your team's productivity with customizable widgets and deep-drill reports.</li>
      <li><strong>Dark Mode & Theme Support:</strong> A complete visual overhaul with full dark mode support and customizable theme tokens.</li>
    </ul>
    
    <h2>The Future is Intelligent</h2>
    
    <p>We believe that the next decade of SaaS will be defined by how well products can augment human capability. With ModernSaaS 2.0, we're taking our first step toward that future.</p>
    
    <blockquote>
      "ModernSaaS 2.0 is the tool we've been waiting for. It has transformed how our engineering team operates and saved us countless hours of manual project management."
      <cite>— Sarah Mitchell, Lead Engineer</cite>
    </blockquote>
    
    <p>We can't wait to see what you build with it. Start your free trial today and experience the future of work.</p>
  `},U={id:"2",slug:"building-scalable-apis",title:"Building Scalable APIs: Lessons from 10 Billion Requests",excerpt:"How we designed and built our API infrastructure to handle massive scale while maintaining sub-100ms response times globally.",category:"engineering",author:f[1],publishedAt:"2026-01-25",readingTime:12,featured:!1,coverImage:"/images/tech-02.jpg",tags:["engineering","api","scalability","performance"],relatedPosts:["1","4"],content:`
    <p>Scaling an API from a few thousand requests to billions is a journey filled with challenges, bottlenecks, and "aha" moments. At ModernSaaS, we recently crossed the 10 billion request mark, and we wanted to share the key engineering principles that made it possible.</p>
    
    <h2>1. Design for Observability from Day One</h2>
    
    <p>You can't fix what you can't see. We invested heavily in structured logging, distributed tracing, and real-time metrics. Every request that enters our system is tagged with a unique trace ID, allowing us to follow its journey through dozens of microservices.</p>
    
    <pre><code>// Example of our internal request middleware
app.use((req, res, next) => {
  const traceId = req.headers['x-trace-id'] || uuid();
  req.ctx = { traceId, startTime: Date.now() };
  next();
});</code></pre>

    <h2>2. Aggressive Caching Strategies</h2>
    
    <p>The fastest request is the one you never have to process. We use a multi-layer caching strategy:</p>
    <ul>
      <li><strong>Edge Caching:</strong> Using our CDN to cache static responses close to the user.</li>
      <li><strong>Redis:</strong> For frequently accessed data that needs to be shared across service instances.</li>
      <li><strong>In-memory:</strong> For high-velocity data within individual services.</li>
    </ul>

    <h2>3. Embracing Eventual Consistency</h2>
    
    <p>In a globally distributed system, strict consistency is often the enemy of performance. By moving non-critical tasks to asynchronous message queues (using RabbitMQ and Kafka), we were able to significantly reduce our p99 latency.</p>
    
    <blockquote>
      "Performance is a feature. If your API is slow, users will find one that isn't. We treat latency targets with the same importance as bug fixes."
      <cite>— Marcus Johnson, CTO</cite>
    </blockquote>

    <h2>Lessons Learned</h2>
    <p>If we had to start over, the biggest thing we'd do differently is automate our load testing earlier. Finding where the system breaks under 10x load is much better than discovering it in production during a traffic spike.</p>
  `},H={id:"3",slug:"state-of-saas-2026",title:"State of SaaS 2026: Trends Shaping the Industry",excerpt:"An in-depth analysis of the trends defining the SaaS landscape in 2026, from AI integration to vertical SaaS and everything in between.",category:"industry",author:f[0],publishedAt:"2026-01-18",readingTime:8,featured:!0,coverImage:"/images/abstract-01.jpg",tags:["industry","trends","SaaS","AI"],relatedPosts:["1","5"],content:`
    <p>The SaaS industry has undergone more changes in the last two years than in the previous ten. As we enter 2026, the landscape is being redefined by several key shifts that every founder and product leader should be watching.</p>
    
    <h2>1. From "AI-In" to "AI-Native"</h2>
    <p>In 2024, every SaaS added an AI "wrapper" or "assistant". In 2026, the most successful products are built with AI at their very core. This means interfaces that adapt to user behavior, predictive workflows that anticipate the next step, and autonomous agents that handle complex tasks without human intervention.</p>
    
    <h2>2. The Rise of Vertical SaaS</h2>
    <p>Horizontal platforms like Slack or Trello are no longer the default choice for every business. We're seeing a massive wave of specialized platforms built for specific industries—from AI for architecture firms to collaboration tools for global logistics.</p>
    
    <h2>3. The Death of the "Dashboard"</h2>
    <p>Traditional dashboards filled with complex charts are being replaced by conversational interfaces and proactive notifications. Users don't want to dig for insights; they want the insights to find them.</p>

    <blockquote>
      "The best software is the software you don't even have to use. It works in the background, solves your problems, and only asks for your attention when absolutely necessary."
    </blockquote>

    <h2>What This Means for You</h2>
    <p>If you're building in 2026, focus on <strong>utility over features</strong>. The question isn't "what can this tool do?" but "how much time does this tool save?".</p>
  `},$={id:"4",slug:"modern-css-architecture",title:"Modern CSS Architecture: From Chaos to Clarity",excerpt:"A deep dive into how we restructured our CSS using modern methodologies like CUBE CSS and Tailwind for maintainable, scalable styles.",category:"engineering",author:f[2],publishedAt:"2026-01-12",readingTime:10,featured:!1,coverImage:"/images/abstract-02.jpg",tags:["engineering","css","frontend","architecture"],relatedPosts:["2","6"],content:`
    <p>Managing CSS in a large-scale application is notoriously difficult. Without a clear strategy, it quickly becomes a tangled web of overrides, <code>!important</code> tags, and unused styles. At ModernSaaS, we decided to tackle this head-on by adopting a modern, hybrid architecture.</p>
    
    <h2>The Problem with Utility-First Only</h2>
    <p>While Tailwind CSS is incredible for rapid development, relying solely on utility classes in a complex design system can lead to massive HTML files and inconsistent patterns. We needed a way to define <strong>high-level components</strong> while keeping the flexibility of utilities.</p>
    
    <h2>Enter CUBE CSS</h2>
    <p>CUBE stands for Composition, Utility, Block, and Exception. It's a methodology that prioritizes the way elements are composed together over their individual styles.</p>
    
    <ul>
      <li><strong>Composition:</strong> Defines high-level layouts (grids, stacks).</li>
      <li><strong>Utility:</strong> One-off styles (margin, padding, color).</li>
      <li><strong>Block:</strong> The individual component (Button, Card).</li>
      <li><strong>Exception:</strong> State-based changes (isActive, isError).</li>
    </ul>

    <h2>Our Implementation</h2>
    <p>We use Tailwind for our **Compositions** and **Utilities**, and CSS Modules for our **Blocks**. This gives us the best of both worlds: a standardized layout system with scoped, maintainable component styles.</p>

    <pre><code>/* Example of a Block with Exceptions */
.button {
  display: inline-flex;
  padding: 0.5rem 1rem;
}

.button[data-variant="primary"] {
  background-color: var(--color-primary);
}</code></pre>

    <blockquote>
      "Architecture is about making choices that minimize future pain. Our CSS strategy allows us to ship features faster without worrying about breaking existing styles."
      <cite>— Sarah Mitchell, Lead Engineer</cite>
    </blockquote>

    <h2>Results</h2>
    <p>Since switching to this architecture, our CSS bundle size has decreased by 40%, and the time it takes to onboard new frontend engineers has been cut in half.</p>
  `},_={id:"5",slug:"customer-success-framework",title:"The Customer Success Framework That Scaled to 10K Customers",excerpt:"How we built a customer success operation that maintains a 95% satisfaction score while scaling from 100 to 10,000 customers.",category:"company",author:f[3],publishedAt:"2026-01-08",readingTime:7,featured:!1,coverImage:"/images/office-01.jpg",tags:["company","customer-success","scaling","growth"],relatedPosts:["3","6"],content:`
    <p>Scaling a SaaS company is about more than just acquisition; it's about retention. As ModernSaaS grew from 100 to 10,000 customers, we had to completely rethink how we approach customer success.</p>
    
    <h2>1. From Reactive to Proactive</h2>
    <p>In the early days, we waited for users to contact us when they had a problem. Today, we use product usage data to identify when a user is "stuck" and reach out to them before they even realize they need help.</p>
    
    <h2>2. Segmented Support</h2>
    <p>Not all customers have the same needs. We developed a tiered success model:</p>
    <ul>
      <li><strong>Self-Serve:</strong> Comprehensive documentation and AI-powered chat for small teams.</li>
      <li><strong>High-Touch:</strong> Dedicated success managers for our enterprise partners.</li>
      <li><strong>Community:</strong> Peer-to-peer support in our user forums.</li>
    </ul>

    <h2>3. Measuring What Matters</h2>
    <p>We moved away from "time to resolution" as our primary metric and started focusing on **"time to value"**. Our goal is to ensure every new customer achieves their first "win" with ModernSaaS within 24 hours of signing up.</p>

    <blockquote>
      "Success isn't about solving tickets; it's about helping customers achieve their goals. If they succeed, we succeed."
      <cite>— Emily Rodriguez, Head of Marketing</cite>
    </blockquote>

    <h2>The Result</h2>
    <p>This framework has allowed us to maintain a Net Promoter Score (NPS) of 75 and a churn rate well below the industry average.</p>
  `},G={id:"6",slug:"productivity-tips-for-remote-teams",title:"10 Essential Productivity Tips for Modern Remote Teams",excerpt:"Master the art of remote work with these 10 actionable tips, from communication protocols to deep work strategies.",category:"tips",author:f[2],publishedAt:"2026-01-05",readingTime:6,featured:!1,coverImage:"/images/devices-01.jpg",tags:["tips","productivity","remote-work","guide"],relatedPosts:["4","5"],content:`
    <p>Remote work is no longer just a perk—it's the default mode of operation for the world's most innovative teams. But working from anywhere comes with its own set of challenges. Here are 10 tips to keep your team productive and engaged.</p>
    
    <h2>1. Establish Async-First Communication</h2>
    <p>Protect your team's focus by defaulting to asynchronous communication. Use tools like ModernSaaS for project updates and only jump on a call when real-time discussion is absolutely necessary.</p>
    
    <h2>2. Define "Core Hours"</h2>
    <p>Even in a global team, having 3-4 hours of overlap ensures that urgent matters can be addressed without waiting 24 hours for a response.</p>
    
    <h2>3. The "No Meeting" Wednesday</h2>
    <p>Dedicate one day a week to deep work. No meetings, no distractions, just pure focus on complex tasks.</p>
    
    <blockquote>
      "The most productive teams aren't the ones who work the most hours; they're the ones who work the most intentionally."
    </blockquote>

    <h2>4. Over-Communicate Context</h2>
    <p>In a remote setting, you lose the subtle cues of office life. Always provide extra context in your messages to avoid misunderstandings.</p>
    
    <h2>5. Invest in Your Workspace</h2>
    <p>A comfortable chair, a good monitor, and a reliable internet connection aren't luxuries—they're essential tools for your trade.</p>

    <h2>Conclusion</h2>
    <p>Remote work is a skill that needs to be practiced. By implementing these tips, you'll be well on your way to building a high-performing distributed team.</p>
  `},K={id:"7",slug:"new-dashboard-features",title:"New Dashboard Features: Custom Widgets and Advanced Filters",excerpt:"We've completely revamped the dashboard experience. Learn about custom widgets, advanced filtering, and the new drag-and-drop interface.",category:"product",author:f[0],publishedAt:"2025-12-20",readingTime:6,featured:!1,coverImage:"/images/tech-03.jpg",tags:["product","features","dashboard","ui"],relatedPosts:["1","8"],content:`
    <p>Your dashboard is the heartbeat of your workspace. Today, we're making it more powerful and personal than ever before with the release of <strong>Dashboard 2.0</strong>.</p>
    
    <h2>Customizable Widgets</h2>
    <p>Everyone works differently. Now, you can build your own dashboard by dragging and dropping widgets from our new library. Choose from:</p>
    <ul>
      <li><strong>Project Velocity:</strong> Track how fast your team is shipping.</li>
      <li><strong>Upcoming Deadlines:</strong> Never miss a milestone again.</li>
      <li><strong>Resource Allocation:</strong> See who's working on what.</li>
      <li><strong>Custom Metrics:</strong> Connect to your internal APIs to show any data you need.</li>
    </ul>
    
    <h2>Advanced Filtering</h2>
    <p>Searching for data in a sea of projects can be frustrating. Our new filtering engine allows you to create complex queries with multiple conditions, and save them for quick access later.</p>

    <blockquote>
      "The new dashboard has given us a level of visibility we never had before. It's like having a superpower for project management."
      <cite>— Alexandra Chen, CEO</cite>
    </blockquote>

    <h2>Available Today</h2>
    <p>Dashboard 2.0 is rolling out to all customers over the next 48 hours. Head over to your dashboard and look for the "Edit Layout" button to get started!</p>
  `},Y={id:"8",slug:"security-best-practices",title:"Security Best Practices for Modern SaaS Applications",excerpt:"A technical guide to implementing security best practices in your SaaS application, from authentication to data encryption.",category:"engineering",author:f[1],publishedAt:"2025-12-15",readingTime:11,featured:!1,coverImage:"/images/abstract-03.jpg",tags:["engineering","security","best-practices","tutorial"],relatedPosts:["2","7"],content:`
    <p>In the world of SaaS, security isn't just a technical requirement—it's the foundation of trust with your customers. As cyber threats become more sophisticated, it's essential to build security into every layer of your application.</p>
    
    <h2>1. Secure Authentication & Authorization</h2>
    <p>Don't roll your own auth. Use proven, battle-tested solutions like OAuth 2.0 and OpenID Connect. Always enforce Multi-Factor Authentication (MFA) for administrative access and sensitive operations.</p>
    
    <h2>2. Encryption at Rest and in Transit</h2>
    <p>Every piece of data that enters your system should be encrypted. Use TLS 1.3 for data in transit and AES-256 for data at rest. Remember to rotate your encryption keys regularly.</p>
    
    <h2>3. The Principle of Least Privilege</h2>
    <p>Every service and user should only have the minimum level of access required to perform their task. This limits the "blast radius" in the event of a security breach.</p>

    <blockquote>
      "Security is not a destination, it's a continuous process of improvement and vigilance."
      <cite>— Marcus Johnson, CTO</cite>
    </blockquote>

    <h2>4. Continuous Monitoring</h2>
    <p>Implement real-time threat detection and alerting. Automated tools should scan your code for vulnerabilities (SAST) and your running applications for weaknesses (DAST) on every commit.</p>

    <h2>Conclusion</h2>
    <p>Security is a shared responsibility. By following these best practices, you're not just protecting your company—you're protecting your customers' future.</p>
  `},J=[F,U,H,$,_,G,K,Y],me=J[0],pe={title:"Stay Updated",description:"Get the latest articles, tutorials, and product updates delivered to your inbox."},x=h.forwardRef(({variant:a="default",size:o="md",rounded:d=!0,className:i="",children:n,...c},l)=>{const r=`
      inline-flex
      items-center
      justify-center
      font-medium
      transition-colors
      duration-200
      whitespace-nowrap
      shrink-0
    `,t={default:`
        bg-bg-secondary
        text-text-secondary
        border
        border-border-default
        dark:bg-bg-secondary
        dark:text-text-secondary
        dark:border-border-default
      `,success:`
        bg-success-100
        text-success-800
        border
        border-success-200
        dark:bg-success-900/30
        dark:text-success-300
        dark:border-success-800
      `,warning:`
        bg-warning-100
        text-warning-800
        border
        border-warning-200
        dark:bg-warning-900/30
        dark:text-warning-300
        dark:border-warning-800
      `,error:`
        bg-error-100
        text-error-800
        border
        border-error-200
        dark:bg-error-900/30
        dark:text-error-300
        dark:border-error-800
      `,info:`
        bg-info-100
        text-info-800
        border
        border-info-200
        dark:bg-info-900/30
        dark:text-info-300
        dark:border-info-800
      `},s={sm:"px-2 py-0.5 text-xs gap-1",md:"px-2.5 py-1 text-sm gap-1.5"},m=d?"rounded-full":"rounded",u=[r,t[a],s[o],m,i].join(" ").replace(/\s+/g," ").trim();return e.jsx("span",{ref:l,className:u,...c,children:n})});x.displayName="Badge";const V=h.forwardRef(({status:a,showDot:o=!0,pulse:d=!1,variant:i="default",size:n="md",className:c="",...l},r)=>{const t={default:"bg-text-muted",success:"bg-success-500",warning:"bg-warning-500",error:"bg-error-500",info:"bg-info-500"},s={sm:"w-1.5 h-1.5",md:"w-2 h-2"};return e.jsxs(x,{ref:r,variant:i,size:n,className:c,...l,children:[o&&e.jsx("span",{className:`inline-block rounded-full ${s[n]} ${t[i]} ${d?"animate-pulse":""}`,"aria-hidden":"true"}),a]})});V.displayName="StatusBadge";const Q=h.forwardRef(({count:a,max:o=99,hideZero:d=!0,variant:i="default",size:n="sm",className:c="",...l},r)=>{if(a===0&&d)return null;const t=a>o?`${o}+`:a.toString();return e.jsx(x,{ref:r,variant:i,size:n,rounded:!0,className:`min-w-[1.25rem] tabular-nums ${c}`,...l,children:t})});Q.displayName="CounterBadge";const R=h.createContext(void 0),k=()=>{const a=h.useContext(R);if(!a)throw new Error("Tabs components must be used within a Tabs provider");return a},X=h.forwardRef(({defaultValue:a,value:o,onValueChange:d,orientation:i="horizontal",hasPanels:n=!0,className:c,children:l,...r},t)=>{const[s,m]=h.useState(a||""),u=h.useId(),p=o!==void 0?o:s,b=h.useCallback(y=>{o===void 0&&m(y),d?.(y)},[o,d]);return e.jsx(R.Provider,{value:{activeTab:p,setActiveTab:b,orientation:i,baseId:u,hasPanels:n},children:e.jsx("div",{ref:t,className:g("flex",i==="horizontal"?"flex-col":"flex-row",c),...r,children:l})})});X.displayName="Tabs";const Z=h.forwardRef(({className:a,children:o,...d},i)=>{const{orientation:n,setActiveTab:c}=k(),l=h.useRef(null),r=t=>{const s=Array.from(l.current?.querySelectorAll('[role="tab"]:not([disabled])')||[]),m=s.findIndex(p=>p.getAttribute("aria-selected")==="true");let u=-1;if(n==="horizontal"?(t.key==="ArrowRight"&&(u=(m+1)%s.length),t.key==="ArrowLeft"&&(u=(m-1+s.length)%s.length)):(t.key==="ArrowDown"&&(u=(m+1)%s.length),t.key==="ArrowUp"&&(u=(m-1+s.length)%s.length)),t.key==="Home"&&(u=0),t.key==="End"&&(u=s.length-1),u!==-1){t.preventDefault();const p=s[u]?.getAttribute("data-value");p&&(c(p),s[u]?.focus())}};return e.jsx("div",{ref:t=>{l.current=t,typeof i=="function"?i(t):i&&(i.current=t)},role:"tablist","aria-orientation":n,onKeyDown:r,className:g("inline-flex h-10 items-center justify-center rounded-lg bg-bg-secondary p-1 text-text-muted overflow-x-auto scrollbar-hide touch-pan-x",n==="vertical"&&"h-auto flex-col items-stretch overflow-x-visible",a),...d,children:o})});Z.displayName="TabsList";const ee=h.forwardRef(({value:a,className:o,children:d,...i},n)=>{const{activeTab:c,setActiveTab:l,baseId:r,hasPanels:t}=k(),s=c===a;return e.jsxs("button",{ref:n,type:"button",role:"tab","aria-selected":s,"aria-controls":t?`${r}-content-${a}`:void 0,id:`${r}-trigger-${a}`,"data-value":a,tabIndex:s?0:-1,onClick:()=>l(a),className:g("relative inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50",s?"text-text-primary":"hover:text-text-primary",o),...i,children:[s&&e.jsx(j.div,{layoutId:`${r}-active-indicator`,className:"absolute inset-0 rounded-md bg-bg-primary shadow-sm",transition:{type:"spring",bounce:.2,duration:.6}}),e.jsx("span",{className:"relative z-10",children:d})]})});ee.displayName="TabsTrigger";const te=h.forwardRef(({value:a,className:o,children:d,style:i,...n},c)=>{const{activeTab:l,baseId:r}=k(),t=l===a;return e.jsx("div",{ref:c,role:"tabpanel",id:`${r}-content-${a}`,"aria-labelledby":`${r}-trigger-${a}`,tabIndex:t?0:-1,className:g("mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",!t&&"hidden",o),style:i,...n,children:e.jsx(D,{mode:"wait",children:t&&e.jsx(j.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},transition:{duration:.2},children:d},a)})})});te.displayName="TabsContent";const ae=h.forwardRef(({post:a,featured:o=!1,className:d,...i},n)=>{const{title:c,excerpt:l,category:r,author:t,publishedAt:s,readingTime:m,coverImage:u,slug:p}=a,b=new Date(s).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}),y=t.name.split(" ").map(z=>z[0]).join("").toUpperCase().slice(0,2);return e.jsxs(T,{ref:n,variant:"default",padding:"none",radius:"xl","data-testid":"blog-post-card",className:g("group flex flex-col h-full bg-bg-primary overflow-hidden border border-border-default hover:border-primary-500/30 transition-all duration-300",o&&"md:flex-row md:items-stretch",d),...i,children:[e.jsxs("div",{className:g("relative overflow-hidden",o?"md:w-2/5":"aspect-video"),children:[e.jsx(A,{src:u,alt:c,aspectRatio:o?"auto":"video",className:"w-full h-full"}),e.jsx("div",{className:"absolute top-4 left-4 z-10",children:e.jsx(x,{variant:"info",className:"bg-bg-primary/90 backdrop-blur-sm border-none shadow-sm",children:r.charAt(0).toUpperCase()+r.slice(1)})})]}),e.jsxs("div",{className:g("flex flex-col flex-grow p-5 md:p-6",o&&"md:w-3/5"),children:[e.jsxs(N,{className:"p-0 border-none space-y-2 pb-3",children:[e.jsxs("div",{className:"flex items-center gap-3 text-xs text-text-muted mb-1",children:[e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx(E,{size:12,"aria-hidden":"true"}),e.jsx("time",{dateTime:s,children:b})]}),e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx(q,{size:12,"aria-hidden":"true"}),e.jsxs("span",{children:[m," min read"]})]})]}),e.jsx(w,{href:v.BLOG_POST(p),className:"group/title",children:e.jsx(C,{className:"text-xl md:text-2xl font-bold group-hover/title:text-primary-600 dark:group-hover/title:text-primary-400 transition-colors line-clamp-2",children:c})})]}),e.jsx(I,{className:"p-0 pt-1 flex-grow",children:e.jsx(M,{className:"text-text-secondary line-clamp-3 leading-relaxed",children:l})}),e.jsxs(P,{className:"p-0 pt-6 mt-6 border-t border-border-default flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"relative w-8 h-8 rounded-full overflow-hidden bg-bg-secondary border border-border-default flex items-center justify-center text-[10px] font-bold text-primary-600 dark:text-primary-400 shrink-0",children:t.avatar?e.jsx("img",{src:t.avatar,alt:t.name,className:"w-full h-full object-cover",loading:"lazy"}):e.jsx("span",{children:y})}),e.jsx("div",{className:"flex flex-col min-w-0",children:e.jsx("span",{className:"text-sm font-semibold text-text-primary truncate",children:t.name})})]}),e.jsxs(w,{href:v.BLOG_POST(p),className:"text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors inline-flex items-center gap-1",children:["Read More",e.jsx("span",{className:"transition-transform group-hover:translate-x-1","aria-hidden":"true",children:"→"})]})]})]})]})});ae.displayName="BlogPostCard";const re=h.forwardRef(({post:a,className:o,...d},i)=>{const{title:n,excerpt:c,category:l,author:r,publishedAt:t,readingTime:s,coverImage:m,slug:u}=a,p=new Date(t).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),b=r.name.split(" ").map(y=>y[0]).join("").toUpperCase().slice(0,2);return e.jsxs(T,{ref:i,variant:"default",padding:"none",radius:"xl","data-testid":"featured-post",className:g("group flex flex-col md:flex-row bg-bg-primary overflow-hidden border border-border-default hover:border-primary-500/30 transition-all duration-300 min-h-[400px]",o),...d,children:[e.jsxs("div",{className:"relative w-full md:w-1/2 lg:w-3/5 overflow-hidden",children:[e.jsx(A,{src:m,alt:n,aspectRatio:"auto",className:"w-full h-full min-h-[300px] object-cover",loading:"eager"}),e.jsx("div",{className:"absolute top-6 left-6 z-10",children:e.jsx(x,{variant:"info",className:"px-3 py-1 text-xs font-bold uppercase tracking-wider bg-primary-600 text-white border-none shadow-lg",children:"Featured Post"})}),e.jsx("div",{className:"absolute bottom-6 left-6 z-10",children:e.jsx(x,{variant:"default",className:"bg-bg-primary/90 backdrop-blur-sm border-none shadow-sm text-primary-700 font-semibold",children:l.charAt(0).toUpperCase()+l.slice(1)})})]}),e.jsxs("div",{className:"flex flex-col flex-grow p-8 md:p-10 lg:p-12 md:w-1/2 lg:w-2/5 justify-center",children:[e.jsxs(N,{className:"p-0 border-none space-y-4 pb-6",children:[e.jsxs("div",{className:"flex items-center gap-4 text-sm text-text-muted mb-2",children:[e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(E,{size:16,"aria-hidden":"true",className:"text-primary-500"}),e.jsx("time",{dateTime:t,children:p})]}),e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(q,{size:16,"aria-hidden":"true",className:"text-primary-500"}),e.jsxs("span",{children:[s," min read"]})]})]}),e.jsx(w,{href:v.BLOG_POST(u),className:"group/title",children:e.jsx(C,{as:"h2",className:"text-3xl md:text-4xl lg:text-5xl font-extrabold group-hover/title:text-primary-600 dark:group-hover/title:text-primary-400 transition-colors leading-tight",children:n})})]}),e.jsx(I,{className:"p-0 pt-2 flex-grow",children:e.jsx(M,{className:"text-lg text-text-secondary leading-relaxed line-clamp-4",children:c})}),e.jsxs(P,{className:"p-0 pt-8 mt-8 border-t border-border-default flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"relative w-12 h-12 rounded-full overflow-hidden bg-bg-secondary border border-border-default flex items-center justify-center text-sm font-bold text-primary-600 dark:text-primary-400 shrink-0",children:r.avatar?e.jsx(B,{src:r.avatar,alt:r.name,containerClassName:"w-full h-full",className:"w-full h-full object-cover",loading:"eager",placeholder:e.jsx("span",{children:b})}):e.jsx("span",{children:b})}),e.jsxs("div",{className:"flex flex-col min-w-0",children:[e.jsx("span",{className:"text-base font-bold text-text-primary truncate",children:r.name}),e.jsx("span",{className:"text-sm text-text-muted truncate",children:r.role})]})]}),e.jsxs(w,{href:v.BLOG_POST(u),className:"hidden sm:inline-flex items-center gap-2 text-base font-bold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors",children:["Read Article",e.jsx(O,{size:18,className:"transition-transform group-hover:translate-x-1","aria-hidden":"true"})]})]})]})]})});re.displayName="FeaturedPost";export{ae as B,E as C,re as F,X as T,Z as a,ee as b,J as c,x as d,pe as e,me as f,q as g,te as h};
