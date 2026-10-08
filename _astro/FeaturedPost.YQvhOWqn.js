import{j as e,u as F}from"./reducedMotion.woTKAiHJ.js";import{R as x,r as m}from"./index.DYrVU9rO.js";import{c as h}from"./cn.4perknFd.js";import{c as O,m as A,A as G}from"./x.CEkUa1eQ.js";import{L as N}from"./Link.DudihF2U.js";import{i as K,g as Y,R as C}from"./DemoLink.DGvCJjkH.js";import{A as J}from"./arrow-right.Cd6eSF68.js";/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],W=O("calendar",V);/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],U=O("clock",Q),X={narrow:"max-w-3xl",default:"max-w-7xl",wide:"max-w-[1440px]",full:"max-w-none"},Z=x.forwardRef(({children:t,size:r="default",center:s=!0,verticalPadding:a=!1,className:i="",as:c="div",...d},n)=>{const o="w-full",l="px-4 sm:px-6 lg:px-8",p=X[r],f=[o,l,p,s?"mx-auto":"",a?"py-8 md:py-12 lg:py-16":"",i].filter(Boolean).join(" ");return x.createElement(c,{ref:n,className:f,...d},t)});Z.displayName="Container";const ee={default:"bg-bg-primary",primary:"bg-primary-50 dark:bg-primary-950/30",secondary:"bg-secondary-50 dark:bg-secondary-950/30",muted:"bg-bg-secondary",gradient:"gradient-mesh",transparent:"bg-transparent"},te={none:"",sm:"py-8",md:"py-12 md:py-16",lg:"py-16 md:py-24",xl:"py-20 md:py-32","2xl":"py-24 md:py-40"},ae=x.forwardRef(({children:t,background:r="default",padding:s="lg",heading:a,subheading:i,id:c,className:d="",as:n="section",contained:o=!1,borderTop:l=!1,borderBottom:p=!1,...u},g)=>{const f=ee[r],b=te[s],T=[f,b,o?"px-4 sm:px-6 lg:px-8":"",l?"border-t border-border-default":"",p?"border-b border-border-default":"",d].filter(Boolean).join(" ");return x.createElement(n,{ref:g,id:c,className:T,...u},e.jsxs(e.Fragment,{children:[(a||i)&&e.jsxs("div",{className:"container-wide mb-12 md:mb-16",children:[a&&e.jsx("h2",{className:"text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary text-center",children:a}),i&&e.jsx("p",{className:"mt-4 text-lg md:text-xl text-text-secondary text-center max-w-3xl mx-auto",children:i})]}),t]}))});ae.displayName="Section";const k=x.forwardRef(({className:t,pulse:r=!0,...s},a)=>{const{prefersReducedMotion:i}=F();return e.jsx("div",{ref:a,className:h("bg-bg-tertiary rounded-md",r&&!i&&"animate-pulse",t),...s})});k.displayName="Skeleton";const $=x.forwardRef(({lines:t=1,gap:r="2",className:s,...a},i)=>e.jsx("div",{ref:i,className:h("flex flex-col w-full",`gap-${r}`,s),children:Array.from({length:t}).map((c,d)=>e.jsx(k,{className:h("h-4 w-full",d===t-1&&t>1&&"w-3/4"),...a},d))}));$.displayName="SkeletonText";const re=x.forwardRef(({size:t="10",className:r,...s},a)=>e.jsx(k,{ref:a,className:h("rounded-full shrink-0",`h-${t} w-${t}`,r),...s}));re.displayName="SkeletonAvatar";const se=x.forwardRef(({hasImage:t=!0,className:r,...s},a)=>e.jsxs("div",{ref:a,className:h("overflow-hidden rounded-xl border border-border-default bg-bg-elevated p-4",r),children:[t&&e.jsx(k,{className:"aspect-video w-full mb-4",...s}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(k,{className:"h-6 w-1/2",...s}),e.jsx($,{lines:3,...s})]})]}));se.displayName="SkeletonCard";const I=m.forwardRef(({src:t,alt:r,loading:s="lazy",className:a,containerClassName:i,placeholder:c=!0,aspectRatio:d,onLoad:n,onError:o,...l},p)=>{const[u,g]=m.useState(!1),[f,b]=m.useState(!1),v=m.useRef(null),S=y=>{g(!0),n&&n(y)},L=y=>{b(!0),o&&o(y)};if(m.useEffect(()=>{v.current?.complete&&!u&&g(!0)},[u]),m.useEffect(()=>{if(u)return;const y=setTimeout(()=>{g(!0)},5e3);return()=>clearTimeout(y)},[u]),!t)return null;const T=t&&!K(t)?Y(t):t;return e.jsxs("div",{className:h("relative overflow-hidden bg-bg-tertiary/20",i),style:{aspectRatio:d},children:[!u&&!f&&c&&e.jsx("div",{className:"absolute inset-0 z-0",children:c===!0?e.jsx(k,{className:"w-full h-full rounded-none"}):c}),f&&e.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-bg-tertiary text-text-muted text-xs p-2 text-center",children:"Failed to load image"}),e.jsx("img",{ref:y=>{v.current=y,typeof p=="function"?p(y):p&&(p.current=y)},src:T,alt:r,loading:s,onLoad:S,onError:L,className:h("transition-opacity duration-500 ease-in-out",u?"opacity-100":"opacity-0",a),...l})]})});I.displayName="LazyImage";const w=[{id:"alex-chen",name:"Alexandra Chen",role:"CEO & Co-Founder",avatar:"/images/team/person-19.jpg",bio:"Alexandra is the CEO and co-founder of ModernSaaS. She writes about product strategy, leadership, and the future of work.",social:{twitter:"https://twitter.com/alexchen",linkedin:"https://linkedin.com/in/alexchen"}},{id:"marcus-johnson",name:"Marcus Johnson",role:"CTO & Co-Founder",avatar:"/images/team/person-20.jpg",bio:"Marcus leads engineering at ModernSaaS. He's passionate about distributed systems, scalability, and developer experience.",social:{twitter:"https://twitter.com/marcusj",linkedin:"https://linkedin.com/in/marcusj"}},{id:"sarah-mitchell",name:"Sarah Mitchell",role:"Lead Engineer",avatar:"/images/team/person-21.jpg",bio:"Sarah is a lead engineer focused on frontend architecture and performance. She contributes to open source and writes about modern web development.",social:{twitter:"https://twitter.com/sarahcodes",linkedin:"https://linkedin.com/in/sarahmitchell"}},{id:"emily-rodriguez",name:"Emily Rodriguez",role:"Head of Marketing",avatar:"/images/team/person-22.jpg",bio:"Emily leads growth and marketing at ModernSaaS. She writes about SaaS marketing, growth strategies, and customer success.",social:{twitter:"https://twitter.com/emilyr",linkedin:"https://linkedin.com/in/emilyr"}}],oe={id:"1",slug:"introducing-modern-saas-2-0",title:"Introducing ModernSaaS 2.0: The Future of Team Collaboration",excerpt:"We're excited to announce the biggest update in our history. ModernSaaS 2.0 brings AI-powered features, real-time collaboration, and a completely redesigned interface.",category:"announcements",author:w[0],publishedAt:"2026-02-01",readingTime:5,featured:!0,coverImage:"/images/tech-01.jpg",tags:["product","announcement","AI","collaboration"],relatedPosts:["2","3"],content:`
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
  `},ie={id:"2",slug:"building-scalable-apis",title:"Building Scalable APIs: Lessons from 10 Billion Requests",excerpt:"How we designed and built our API infrastructure to handle massive scale while maintaining sub-100ms response times globally.",category:"engineering",author:w[1],publishedAt:"2026-01-25",readingTime:12,featured:!1,coverImage:"/images/tech-02.jpg",tags:["engineering","api","scalability","performance"],relatedPosts:["1","4"],content:`
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
  `},ne={id:"3",slug:"state-of-saas-2026",title:"State of SaaS 2026: Trends Shaping the Industry",excerpt:"An in-depth analysis of the trends defining the SaaS landscape in 2026, from AI integration to vertical SaaS and everything in between.",category:"industry",author:w[0],publishedAt:"2026-01-18",readingTime:8,featured:!0,coverImage:"/images/abstract-01.jpg",tags:["industry","trends","SaaS","AI"],relatedPosts:["1","5"],content:`
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
  `},le={id:"4",slug:"modern-css-architecture",title:"Modern CSS Architecture: From Chaos to Clarity",excerpt:"A deep dive into how we restructured our CSS using modern methodologies like CUBE CSS and Tailwind for maintainable, scalable styles.",category:"engineering",author:w[2],publishedAt:"2026-01-12",readingTime:10,featured:!1,coverImage:"/images/abstract-02.jpg",tags:["engineering","css","frontend","architecture"],relatedPosts:["2","6"],content:`
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
  `},de={id:"5",slug:"customer-success-framework",title:"The Customer Success Framework That Scaled to 10K Customers",excerpt:"How we built a customer success operation that maintains a 95% satisfaction score while scaling from 100 to 10,000 customers.",category:"company",author:w[3],publishedAt:"2026-01-08",readingTime:7,featured:!1,coverImage:"/images/office-01.jpg",tags:["company","customer-success","scaling","growth"],relatedPosts:["3","6"],content:`
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
  `},ce={id:"6",slug:"productivity-tips-for-remote-teams",title:"10 Essential Productivity Tips for Modern Remote Teams",excerpt:"Master the art of remote work with these 10 actionable tips, from communication protocols to deep work strategies.",category:"tips",author:w[2],publishedAt:"2026-01-05",readingTime:6,featured:!1,coverImage:"/images/devices-01.jpg",tags:["tips","productivity","remote-work","guide"],relatedPosts:["4","5"],content:`
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
  `},ue={id:"7",slug:"new-dashboard-features",title:"New Dashboard Features: Custom Widgets and Advanced Filters",excerpt:"We've completely revamped the dashboard experience. Learn about custom widgets, advanced filtering, and the new drag-and-drop interface.",category:"product",author:w[0],publishedAt:"2025-12-20",readingTime:6,featured:!1,coverImage:"/images/tech-03.jpg",tags:["product","features","dashboard","ui"],relatedPosts:["1","8"],content:`
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
  `},me={id:"8",slug:"security-best-practices",title:"Security Best Practices for Modern SaaS Applications",excerpt:"A technical guide to implementing security best practices in your SaaS application, from authentication to data encryption.",category:"engineering",author:w[1],publishedAt:"2025-12-15",readingTime:11,featured:!1,coverImage:"/images/abstract-03.jpg",tags:["engineering","security","best-practices","tutorial"],relatedPosts:["2","7"],content:`
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
  `},he=[oe,ie,ne,le,de,ce,ue,me],Ie=he[0],Re={title:"Stay Updated",description:"Get the latest articles, tutorials, and product updates delivered to your inbox."},H=m.forwardRef(({variant:t="default",padding:r="md",radius:s="md",hover:a=!1,glow:i=!1,fullWidth:c=!1,className:d="",children:n,...o},l)=>{const{prefersReducedMotion:p}=F(),u={default:h("bg-bg-primary border border-border-default shadow-md shadow-shadow-default",a&&"hover:border-border-strong"),outlined:"bg-bg-primary border-2 border-border-strong shadow-none",elevated:"bg-bg-primary border border-border-default shadow-xl shadow-shadow-default",flat:"bg-bg-secondary border-none shadow-none"},g={none:"",sm:"p-3",md:"p-4",lg:"p-6",xl:"p-8"},f={none:"rounded-none",sm:"rounded-sm",md:"rounded-lg",lg:"rounded-xl",xl:"rounded-2xl",full:"rounded-3xl"},b=a?h("cursor-pointer transition-all duration-300 ease-out",!p&&"hover:-translate-y-1",t==="default"&&"hover:shadow-lg",t==="elevated"&&"hover:shadow-2xl",(i||t==="default")&&!p&&"hover:shadow-primary/10 hover:border-primary-500/30"):"",v=c?"w-full":"",S=A.div;return e.jsx(S,{ref:l,className:h("relative overflow-hidden",u[t],g[r],f[s],b,v,d),...o,children:n})});H.displayName="Card";const R=m.forwardRef(({className:t="",children:r,...s},a)=>e.jsx("div",{ref:a,className:h("flex flex-col space-y-1.5","pb-4","border-b border-border-default",t),...s,children:r}));R.displayName="CardHeader";const M=m.forwardRef(({as:t="h3",className:r="",children:s,...a},i)=>e.jsx(t,{ref:i,className:h("text-lg font-semibold","text-text-primary","leading-none tracking-tight",r),...a,children:s}));M.displayName="CardTitle";const E=m.forwardRef(({className:t="",children:r,...s},a)=>e.jsx("p",{ref:a,className:h("text-sm text-text-secondary",t),...s,children:r}));E.displayName="CardDescription";const P=m.forwardRef(({className:t="",children:r,...s},a)=>e.jsx("div",{ref:a,className:h("pt-4",t),...s,children:r}));P.displayName="CardContent";const q=m.forwardRef(({className:t="",children:r,...s},a)=>e.jsx("div",{ref:a,className:h("flex items-center","pt-4 mt-4","border-t border-border-default",t),...s,children:r}));q.displayName="CardFooter";const z=m.forwardRef(({src:t,alt:r,aspectRatio:s="video",objectFit:a="cover",className:i="",...c},d)=>{const n={video:"aspect-video",square:"aspect-square",portrait:"aspect-[3/4]",auto:""},o={cover:"object-cover",contain:"object-contain",fill:"object-fill"};return e.jsx(I,{ref:d,src:t,alt:r,containerClassName:h("relative overflow-hidden",n[s]),className:h("w-full h-full",o[a],"transition-transform duration-300 ease-out","group-hover:scale-105",i),aspectRatio:s==="auto"?void 0:s==="video"?"16/9":s==="square"?"1/1":"3/4",...c})});z.displayName="CardImage";const B=m.forwardRef(({className:t="",children:r,...s},a)=>e.jsx(H,{ref:a,hover:!0,className:t,...s,children:r}));B.displayName="HoverableCard";const j=m.forwardRef(({variant:t="default",size:r="md",rounded:s=!0,className:a="",children:i,...c},d)=>{const n=`
      inline-flex
      items-center
      justify-center
      font-medium
      transition-colors
      duration-200
      whitespace-nowrap
      shrink-0
    `,o={default:`
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
      `},l={sm:"px-2 py-0.5 text-xs gap-1",md:"px-2.5 py-1 text-sm gap-1.5"},p=s?"rounded-full":"rounded",u=[n,o[t],l[r],p,a].join(" ").replace(/\s+/g," ").trim();return e.jsx("span",{ref:d,className:u,...c,children:i})});j.displayName="Badge";const pe=m.forwardRef(({status:t,showDot:r=!0,pulse:s=!1,variant:a="default",size:i="md",className:c="",...d},n)=>{const o={default:"bg-text-muted",success:"bg-success-500",warning:"bg-warning-500",error:"bg-error-500",info:"bg-info-500"},l={sm:"w-1.5 h-1.5",md:"w-2 h-2"};return e.jsxs(j,{ref:n,variant:a,size:i,className:c,...d,children:[r&&e.jsx("span",{className:`inline-block rounded-full ${l[i]} ${o[a]} ${s?"animate-pulse":""}`,"aria-hidden":"true"}),t]})});pe.displayName="StatusBadge";const ge=m.forwardRef(({count:t,max:r=99,hideZero:s=!0,variant:a="default",size:i="sm",className:c="",...d},n)=>{if(t===0&&s)return null;const o=t>r?`${r}+`:t.toString();return e.jsx(j,{ref:n,variant:a,size:i,rounded:!0,className:`min-w-[1.25rem] tabular-nums ${c}`,...d,children:o})});ge.displayName="CounterBadge";const _=m.createContext(void 0),D=()=>{const t=m.useContext(_);if(!t)throw new Error("Tabs components must be used within a Tabs provider");return t},fe=m.forwardRef(({defaultValue:t,value:r,onValueChange:s,orientation:a="horizontal",hasPanels:i=!0,className:c,children:d,...n},o)=>{const[l,p]=m.useState(t||""),u=m.useId(),g=r!==void 0?r:l,f=m.useCallback(b=>{r===void 0&&p(b),s?.(b)},[r,s]);return e.jsx(_.Provider,{value:{activeTab:g,setActiveTab:f,orientation:a,baseId:u,hasPanels:i},children:e.jsx("div",{ref:o,className:h("flex",a==="horizontal"?"flex-col":"flex-row",c),...n,children:d})})});fe.displayName="Tabs";const be=m.forwardRef(({className:t,children:r,...s},a)=>{const{orientation:i,setActiveTab:c}=D(),d=m.useRef(null),n=o=>{const l=Array.from(d.current?.querySelectorAll('[role="tab"]:not([disabled])')||[]),p=l.findIndex(g=>g.getAttribute("aria-selected")==="true");let u=-1;if(i==="horizontal"?(o.key==="ArrowRight"&&(u=(p+1)%l.length),o.key==="ArrowLeft"&&(u=(p-1+l.length)%l.length)):(o.key==="ArrowDown"&&(u=(p+1)%l.length),o.key==="ArrowUp"&&(u=(p-1+l.length)%l.length)),o.key==="Home"&&(u=0),o.key==="End"&&(u=l.length-1),u!==-1){o.preventDefault();const g=l[u]?.getAttribute("data-value");g&&(c(g),l[u]?.focus())}};return e.jsx("div",{ref:o=>{d.current=o,typeof a=="function"?a(o):a&&(a.current=o)},role:"tablist","aria-orientation":i,onKeyDown:n,className:h("inline-flex h-10 items-center justify-center rounded-lg bg-bg-secondary p-1 text-text-muted overflow-x-auto scrollbar-hide touch-pan-x",i==="vertical"&&"h-auto flex-col items-stretch overflow-x-visible",t),...s,children:r})});be.displayName="TabsList";const ye=m.forwardRef(({value:t,className:r,children:s,...a},i)=>{const{activeTab:c,setActiveTab:d,baseId:n,hasPanels:o}=D(),l=c===t;return e.jsxs("button",{ref:i,type:"button",role:"tab","aria-selected":l,"aria-controls":o?`${n}-content-${t}`:void 0,id:`${n}-trigger-${t}`,"data-value":t,tabIndex:l?0:-1,onClick:()=>d(t),className:h("relative inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50",l?"text-text-primary":"hover:text-text-primary",r),...a,children:[l&&e.jsx(A.div,{layoutId:`${n}-active-indicator`,className:"absolute inset-0 rounded-md bg-bg-primary shadow-sm",transition:{type:"spring",bounce:.2,duration:.6}}),e.jsx("span",{className:"relative z-10",children:s})]})});ye.displayName="TabsTrigger";const xe=m.forwardRef(({value:t,className:r,children:s,style:a,...i},c)=>{const{activeTab:d,baseId:n}=D(),o=d===t;return e.jsx("div",{ref:c,role:"tabpanel",id:`${n}-content-${t}`,"aria-labelledby":`${n}-trigger-${t}`,tabIndex:o?0:-1,className:h("mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",!o&&"hidden",r),style:a,...i,children:e.jsx(G,{mode:"wait",children:o&&e.jsx(A.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},transition:{duration:.2},children:s},t)})})});xe.displayName="TabsContent";const we=m.forwardRef(({post:t,featured:r=!1,className:s,...a},i)=>{const{title:c,excerpt:d,category:n,author:o,publishedAt:l,readingTime:p,coverImage:u,slug:g}=t,f=new Date(l).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}),b=o.name.split(" ").map(v=>v[0]).join("").toUpperCase().slice(0,2);return e.jsxs(B,{ref:i,variant:"default",padding:"none",radius:"xl","data-testid":"blog-post-card",className:h("group flex flex-col h-full bg-bg-primary overflow-hidden border border-border-default hover:border-primary-500/30 transition-all duration-300",r&&"md:flex-row md:items-stretch",s),...a,children:[e.jsxs("div",{className:h("relative overflow-hidden",r?"md:w-2/5":"aspect-video"),children:[e.jsx(z,{src:u,alt:c,aspectRatio:r?"auto":"video",className:"w-full h-full"}),e.jsx("div",{className:"absolute top-4 left-4 z-10",children:e.jsx(j,{variant:"info",className:"bg-bg-primary/90 backdrop-blur-sm border-none shadow-sm",children:n.charAt(0).toUpperCase()+n.slice(1)})})]}),e.jsxs("div",{className:h("flex flex-col flex-grow p-5 md:p-6",r&&"md:w-3/5"),children:[e.jsxs(R,{className:"p-0 border-none space-y-2 pb-3",children:[e.jsxs("div",{className:"flex items-center gap-3 text-xs text-text-muted mb-1",children:[e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx(W,{size:12,"aria-hidden":"true"}),e.jsx("time",{dateTime:l,children:f})]}),e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx(U,{size:12,"aria-hidden":"true"}),e.jsxs("span",{children:[p," min read"]})]})]}),e.jsx(N,{href:C.BLOG_POST(g),className:"group/title",children:e.jsx(M,{className:"text-xl md:text-2xl font-bold group-hover/title:text-primary-600 dark:group-hover/title:text-primary-400 transition-colors line-clamp-2",children:c})})]}),e.jsx(P,{className:"p-0 pt-1 flex-grow",children:e.jsx(E,{className:"text-text-secondary line-clamp-3 leading-relaxed",children:d})}),e.jsxs(q,{className:"p-0 pt-6 mt-6 border-t border-border-default flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"relative w-8 h-8 rounded-full overflow-hidden bg-bg-secondary border border-border-default flex items-center justify-center text-[10px] font-bold text-primary-600 dark:text-primary-400 shrink-0",children:o.avatar?e.jsx("img",{src:o.avatar,alt:o.name,className:"w-full h-full object-cover",loading:"lazy"}):e.jsx("span",{children:b})}),e.jsx("div",{className:"flex flex-col min-w-0",children:e.jsx("span",{className:"text-sm font-semibold text-text-primary truncate",children:o.name})})]}),e.jsxs(N,{href:C.BLOG_POST(g),className:"text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors inline-flex items-center gap-1",children:["Read More",e.jsx("span",{className:"transition-transform group-hover:translate-x-1","aria-hidden":"true",children:"→"})]})]})]})]})});we.displayName="BlogPostCard";const ve=m.forwardRef(({post:t,className:r,...s},a)=>{const{title:i,excerpt:c,category:d,author:n,publishedAt:o,readingTime:l,coverImage:p,slug:u}=t,g=new Date(o).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),f=n.name.split(" ").map(b=>b[0]).join("").toUpperCase().slice(0,2);return e.jsxs(B,{ref:a,variant:"default",padding:"none",radius:"xl","data-testid":"featured-post",className:h("group flex flex-col md:flex-row bg-bg-primary overflow-hidden border border-border-default hover:border-primary-500/30 transition-all duration-300 min-h-[400px]",r),...s,children:[e.jsxs("div",{className:"relative w-full md:w-1/2 lg:w-3/5 overflow-hidden",children:[e.jsx(z,{src:p,alt:i,aspectRatio:"auto",className:"w-full h-full min-h-[300px] object-cover",loading:"eager"}),e.jsx("div",{className:"absolute top-6 left-6 z-10",children:e.jsx(j,{variant:"info",className:"px-3 py-1 text-xs font-bold uppercase tracking-wider bg-primary-600 text-white border-none shadow-lg",children:"Featured Post"})}),e.jsx("div",{className:"absolute bottom-6 left-6 z-10",children:e.jsx(j,{variant:"default",className:"bg-bg-primary/90 backdrop-blur-sm border-none shadow-sm text-primary-700 font-semibold",children:d.charAt(0).toUpperCase()+d.slice(1)})})]}),e.jsxs("div",{className:"flex flex-col flex-grow p-8 md:p-10 lg:p-12 md:w-1/2 lg:w-2/5 justify-center",children:[e.jsxs(R,{className:"p-0 border-none space-y-4 pb-6",children:[e.jsxs("div",{className:"flex items-center gap-4 text-sm text-text-muted mb-2",children:[e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(W,{size:16,"aria-hidden":"true",className:"text-primary-500"}),e.jsx("time",{dateTime:o,children:g})]}),e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(U,{size:16,"aria-hidden":"true",className:"text-primary-500"}),e.jsxs("span",{children:[l," min read"]})]})]}),e.jsx(N,{href:C.BLOG_POST(u),className:"group/title",children:e.jsx(M,{as:"h2",className:"text-3xl md:text-4xl lg:text-5xl font-extrabold group-hover/title:text-primary-600 dark:group-hover/title:text-primary-400 transition-colors leading-tight",children:i})})]}),e.jsx(P,{className:"p-0 pt-2 flex-grow",children:e.jsx(E,{className:"text-lg text-text-secondary leading-relaxed line-clamp-4",children:c})}),e.jsxs(q,{className:"p-0 pt-8 mt-8 border-t border-border-default flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"relative w-12 h-12 rounded-full overflow-hidden bg-bg-secondary border border-border-default flex items-center justify-center text-sm font-bold text-primary-600 dark:text-primary-400 shrink-0",children:n.avatar?e.jsx(I,{src:n.avatar,alt:n.name,containerClassName:"w-full h-full",className:"w-full h-full object-cover",loading:"eager",placeholder:e.jsx("span",{children:f})}):e.jsx("span",{children:f})}),e.jsxs("div",{className:"flex flex-col min-w-0",children:[e.jsx("span",{className:"text-base font-bold text-text-primary truncate",children:n.name}),e.jsx("span",{className:"text-sm text-text-muted truncate",children:n.role})]})]}),e.jsxs(N,{href:C.BLOG_POST(u),className:"hidden sm:inline-flex items-center gap-2 text-base font-bold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors",children:["Read Article",e.jsx(J,{size:18,className:"transition-transform group-hover:translate-x-1","aria-hidden":"true"})]})]})]})]})});ve.displayName="FeaturedPost";export{we as B,Z as C,ve as F,I as L,ae as S,fe as T,be as a,ye as b,he as c,H as d,R as e,Ie as f,P as g,q as h,j as i,M as j,E as k,Re as l,W as m,U as n,k as o,xe as p};
