import{_ as o,D as i,c as d,b as c,w as s,a3 as p,a2 as a,o as e,I as n,a as l}from"./chunks/framework.C9InrCCS.js";const C=JSON.parse('{"title":"模块","description":"","frontmatter":{},"headers":[],"relativePath":"zh/concept/module.md","filePath":"zh/concept/module.md"}'),h={name:"zh/concept/module.md"},r=a(`<h1 id="模块" tabindex="-1">模块 <a class="header-anchor" href="#模块" aria-label="Permalink to &quot;模块&quot;">​</a></h1><p>在 zeddy 中，模块是框架能够控制的最小单位。 当一个结构体实现了 <code>github.com/zeddy-go/zeddy/app.Module</code> 接口， 它就是一个模块了。 框架会通过判断模块是否实现<strong>特定的</strong>接口来决定如何使用该模块。 至于模块中的内容怎么组织，您完全可以自由发挥。 另外，您完全可以将模块作为独立的 <code>go模块</code> 编写，并在需要的时候从远程导入。</p><p>下面的代码定义了一个模块：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">github.com/zeddy-go/zeddy/app</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Module</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> struct</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	app</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Module</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>在 <code>github.com/zeddy-go/zeddy/app/contract.go</code> 中，我们为模块定义了一些可供实现的接口。 这些接口中的方法就是框架与模块互动的方式。 当框架启动时，会遍历所有模块，并按照如下顺序尝试调用方法。</p>`,5),E=a('<p><code>Init</code> 方法和 <code>Boot</code> 方法主要是对模块做初始化操作，分为两个方法是为了减少各个模块对执行顺序的依赖。</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>这个思想很简单，因为框架会将所有 <code>Init</code> 方法都执行完成后才会继续执行所有 <code>Boot</code> 方法， 所以集中在执行顺序较靠前的 <code>Init</code> 方法中绑定对象的 <code>New方法</code> ( 也就是常说的 <code>provider</code> ) ， 而在顺序较靠后的 <code>Boot</code> 方法中从容器中取我们需要的对象来做相应操作。 这样就可以避免因为依赖的对象还没有被实例化或者根本就还没有绑定 <code>provider</code> 而导致的问题。</p></div><div class="danger custom-block"><p class="custom-block-title">DANGER</p><p>细心的您应该已经察觉到，各模块间的依赖并不能完全消除，例如 <code>configx</code> 模块不是第一个被执行，那么其他模块就有可能报错。</p></div><p><code>Start</code> 和 <code>Stop</code> 则是运行阻塞逻辑的地方，例如启动一个http服务。 启动时，框架会以协程方式执行所有 <code>Start</code> 方法，退出时，框架会执行所有 <code>Stop</code> 方法， 然后等待所有 <code>Start</code> 方法退出。</p><div class="danger custom-block"><p class="custom-block-title">DANGER</p><p>请一定确保您的Start方法能正常退出，否者框架也无法退出。</p></div>',5);function k(_,g,B,m,u,A){const t=i("Mermaid");return e(),d("div",null,[r,(e(),c(p,null,{default:s(()=>[n(t,{id:"mermaid-13",class:"mermaid",graph:"flowchart%20TD%0A%20%20%20%20A%5B%E8%B0%83%E7%94%A8%E6%89%80%E6%9C%89Initable.Init%5D%20--%3E%20B%5B%E6%95%B0%E6%8D%AE%E8%BF%81%E7%A7%BB%E5%92%8C%E6%95%B0%E6%8D%AE%E5%A1%AB%E5%85%85%5D%3B%0A%20%20%20%20B%20--%3E%20C%5B%E8%B0%83%E7%94%A8%E6%89%80%E6%9C%89Bootable.Boot%5D%3B%0A%20%20%20%20C%20--%3E%20D%5B%E8%B0%83%E7%94%A8%E6%89%80%E6%9C%89Startable.Start%5D%3B%0A%20%20%20%20D%20--%20%E6%A1%86%E6%9E%B6%E5%81%9C%E6%AD%A2%20--%3E%20F%5B%E8%B0%83%E7%94%A8%E6%89%80%E6%9C%89Stopable.Stop%5D%3B%0A"})]),fallback:s(()=>[l(" Loading... ")]),_:1})),E])}const b=o(h,[["render",k]]);export{C as __pageData,b as default};