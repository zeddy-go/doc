import{_ as s,c as i,o as a,a2 as t}from"./chunks/framework.C9InrCCS.js";const E=JSON.parse('{"title":"configx","description":"","frontmatter":{},"headers":[],"relativePath":"zh/module/configx.md","filePath":"zh/module/configx.md"}'),n={name:"zh/module/configx.md"},e=t(`<h1 id="configx" tabindex="-1">configx <a class="header-anchor" href="#configx" aria-label="Permalink to &quot;configx&quot;">​</a></h1><p>模块 <code>configx</code> 负责读取配置，供其他模块使用。 <code>configx</code> 使用 github.com/spf13/viper 管理配置，<code>confix</code> 将它设置为读取配置后再自动读取环境变量，这样环境变量将会覆盖已有配置项的值。 使用配置则是直接使用viper包，减少心智负担。</p><h2 id="读取配置" tabindex="-1">读取配置 <a class="header-anchor" href="#读取配置" aria-label="Permalink to &quot;读取配置&quot;">​</a></h2><p>在快速开始示例中，我们使用embed来将配置文件作为字符串嵌入到程序中(示例项目/conf)，这时相关代码如下：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">app.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Use</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    configx.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">NewModule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(configx.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">WithContent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(conf.Config)),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>configx.WithContent 方法接收一个字符串，这样在编译后，我们就得到了一个已经包含默认配置的程序。在部署时，我们只需要修改环境变量即可修改程序配置。</p><p>您也可以像以前一样，为每个程序附带一个配置文件，那么代码是下面这样：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">app.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Use</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    configx.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">NewModule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(configx.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">WithPath</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/path/to/config.yaml&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>configx.WithPath 方法接收一个路径。同样的，环境变量也能覆盖已有的配置项。</p><h2 id="使用配置" tabindex="-1">使用配置 <a class="header-anchor" href="#使用配置" aria-label="Permalink to &quot;使用配置&quot;">​</a></h2><p>使用配置代码如下：</p><p>通过依赖注入使用</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">container.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Invoke</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">c</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">viper</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Viper</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    c.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GetString</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;xxx&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><p>或者直接使用</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">viper.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GetString</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;xxx&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><h2 id="使用环境变量表示层级关系" tabindex="-1">使用环境变量表示层级关系 <a class="header-anchor" href="#使用环境变量表示层级关系" aria-label="Permalink to &quot;使用环境变量表示层级关系&quot;">​</a></h2><p>因环境变量名中无法使用 <code>.</code> 号，所以我们使用 <code>__</code>(两个下划线) 来替换 <code>.</code>。 例如，在配置文件中我们有这样的配置：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">database</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    dsn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;xxxxxxxxxx&quot;</span></span></code></pre></div><p>那么环境变量我们需要写成这样：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">DATABASE__DSN</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">xxxxxxxxxxx</span></span></code></pre></div><h2 id="模式" tabindex="-1">模式 <a class="header-anchor" href="#模式" aria-label="Permalink to &quot;模式&quot;">​</a></h2><p>configx 中自带了四种模式：</p><ul><li>local：本地开发模式</li><li>develop: 线上开发环境模式</li><li>staging：线上预发布环境模式</li><li>release：线上正式环境模式</li></ul><p>在处理某些任务的时候，框架会需要知道当前的模式。</p><h2 id="slog" tabindex="-1">slog <a class="header-anchor" href="#slog" aria-label="Permalink to &quot;slog&quot;">​</a></h2><p>框架默认使用 slog 包作为日志输出工具, 在 configx 初始化时会顺便配置 slog 包。 若当前为 local 模式，configx 包会将 slog 的最低打印 level 设置为 debug。</p>`,26),h=[e];function l(p,k,o,d,c,g){return a(),i("div",null,h)}const u=s(n,[["render",l]]);export{E as __pageData,u as default};
