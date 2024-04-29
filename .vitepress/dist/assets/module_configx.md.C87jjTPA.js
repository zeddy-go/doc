import{_ as i,c as s,o as a,a2 as e}from"./chunks/framework.C9InrCCS.js";const E=JSON.parse('{"title":"configx","description":"","frontmatter":{},"headers":[],"relativePath":"module/configx.md","filePath":"module/configx.md"}'),n={name:"module/configx.md"},t=e(`<h1 id="configx" tabindex="-1">configx <a class="header-anchor" href="#configx" aria-label="Permalink to &quot;configx&quot;">​</a></h1><p>The module <code>configx</code> is responsible for reading configurations for use by other modules. <code>configx</code> utilizes github.com/spf13/viper for managing configurations, and it is set up to automatically read environment variables after loading the configurations. This means that environment variables will override the values of existing configuration items. Configurations are used directly through the Viper package, which reduces cognitive load.</p><h2 id="read-configuration" tabindex="-1">Read Configuration <a class="header-anchor" href="#read-configuration" aria-label="Permalink to &quot;Read Configuration&quot;">​</a></h2><p>In the quick start example, we use the embed package to embed the configuration file as a string within the program (example project in the conf directory), and the relevant code is as follows:</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">app.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Use</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    configx.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">NewModule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(configx.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">WithContent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(conf.Config)),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>The <code>configx.WithContent</code> method accepts a string, so after compilation, we have a program that already includes default configurations. When deploying, we only need to modify the environment variables to change the program&#39;s configuration.</p><p>You may also, as before, attach a configuration file to each program, in which case the code would be as follows:</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">app.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Use</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    configx.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">NewModule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(configx.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">WithPath</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/path/to/config.yaml&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>The <code>configx.WithPath</code> method accepts a path. Similarly, environment variables can override existing configuration items.</p><h2 id="use-configuration" tabindex="-1">Use Configuration <a class="header-anchor" href="#use-configuration" aria-label="Permalink to &quot;Use Configuration&quot;">​</a></h2><p>The code for using the configuration is as follows:</p><p>Use via Dependency Injection</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">container.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Invoke</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">c</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">viper</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Viper</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    c.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GetString</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;xxx&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><p>Or use it directly</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">viper.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GetString</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;xxx&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><h2 id="use-environment-variables-to-represent-hierarchical-relationships" tabindex="-1">Use Environment Variables to Represent Hierarchical Relationships <a class="header-anchor" href="#use-environment-variables-to-represent-hierarchical-relationships" aria-label="Permalink to &quot;Use Environment Variables to Represent Hierarchical Relationships&quot;">​</a></h2><p>Since the use of a period (.) is not allowed in environment variable names, we use <code>__</code> (two underscores) as a substitute for the period (.). For example, in the configuration file, we have the following configuration:</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">database</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    dsn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;xxxxxxxxxx&quot;</span></span></code></pre></div><p>Therefore, the environment variable should be written as follows:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">DATABASE__DSN</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">xxxxxxxxxxx</span></span></code></pre></div><h2 id="mode" tabindex="-1">mode <a class="header-anchor" href="#mode" aria-label="Permalink to &quot;mode&quot;">​</a></h2><p><code>configx</code> comes with four built-in modes:</p><ul><li>local：Local Development Mode</li><li>develop: Online Development Environment Mode</li><li>staging：Staging Environment Mode</li><li>release：Production Environment Mode</li></ul><p>The framework may need to know the current mode when handling certain tasks.</p><h2 id="slog" tabindex="-1">slog <a class="header-anchor" href="#slog" aria-label="Permalink to &quot;slog&quot;">​</a></h2><p>The framework defaults to using the slog package as the logging tool, and it will configure the slog package during the initialization of <code>configx</code>. If the current mode is local, the <code>configx</code> package will set the minimum log level for slog to debug.</p>`,26),o=[t];function l(h,p,r,d,c,k){return a(),s("div",null,o)}const u=i(n,[["render",l]]);export{E as __pageData,u as default};