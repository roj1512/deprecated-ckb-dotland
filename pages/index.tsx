// Copyright 2022 the Deno authors. All rights reserved. MIT license.

/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h, Head } from "../deps.ts";
import { CodeBlock } from "../components/CodeBlock.tsx";
import { Footer } from "../components/Footer.tsx";
import { InlineCode } from "../components/InlineCode.tsx";
import { Header } from "../components/Header.tsx";
import versions from "../versions.json" assert { type: "json" };
import { Background } from "../components/HeroBackground.tsx";

export default function Home() {
  const complexExampleProgram =
    `import { serve } from "https://deno.land/std/http/server.ts";
serve(req => new Response("Hello World\\n"));`;

  const denoTestExample =
    `deno test https://deno.land/std@0.132.0/testing/chai_example.ts
running 3 tests from https://deno.land/std@0.132.0/testing/chai_example.ts
test we can make chai assertions ... ok (8ms)
test we can make chai expectations ... ok (2ms)
test we can use chai should style ... ok (4ms)

test result: ok. 3 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out (27ms)`;

  return (
    <div>
      <Head>
        <title>دێنۆ - ژینگەیەکی مۆدێرن بۆ تایپسکریپت و جاڤاسکریپت</title>
      </Head>
      <div class="bg-white">
        <div class="bg-gray-50 overflow-x-hidden border-b border-gray-200 relative">
          <Background />
          <Header main />
          <div class="relative max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 pt-12 pb-20 flex flex-col items-center">
            <h1 class="font-extrabold text-5xl leading-10 tracking-tight text-gray-900">
              دێنۆ
            </h1>
            <h2 class="mt-4 sm:mt-5 font-light text-2xl text-center leading-tight text-gray-900">
              ژینگەیەکی <strong class="font-semibold">مۆدێرن</strong> بۆ{" "}
              <strong class="font-semibold">تایپسکریپت</strong> و{" "}
              <strong class="font-semibold">جاڤاسکریپت</strong>.
            </h2>
            <a
              href="/#installation"
              class="rounded-full mt-8 px-8 py-2 transition-colors duration-75 ease-in-out bg-blue-500 hover:bg-blue-400 text-white text-lg shadow-lg"
            >
              دایبمەزرێنە
            </a>
            <a
              href="https://github.com/denoland/deno/releases/latest"
              class="mt-4"
            >
              {versions.cli[0]}
            </a>
          </div>
        </div>
        <div class="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 mt-20">
          <p class="my-4 text-gray-700">
            دێنۆ ژینگەیەکی مۆدێرن و پارێزراوە بۆ تایپسکریپت و جاڤاسکریپت کە V8
            بەکار دەهێنێت و بە زمانی ڕەست نووسراوە.
          </p>
          <ol class="mr-8 list-disc text-gray-700">
            <li>
              لە بنەڕەتەوە پارێزراوە. ناتوانێت دەستی بگات بە فایلەکان، نێتوۆرک و
              هتد مەگەر خۆت بهێڵیت.
            </li>
            <li>
              لەناو خۆی 
              <a class="link" href="/manual/tools">
               چەند کەرەستەیەکی
              </a>{" "}تێدایە،
              بۆ نموونە dependency inspector (
              <a class="link" href="/manual/tools/dependency_inspector">
                <InlineCode>deno info</InlineCode>
              </a>
              ) و ڕازێنەرەوەی کۆد (
              <a class="link" href="/manual/tools/formatter">
                <InlineCode>deno fmt</InlineCode>
              </a>
              ).
            </li>
            <li>
              چەندین مۆدیوڵی ستانداردی هەیە کە لە گەرەنتیی کارکردنیان هەیە:{" "}
              <a href="https://deno.land/std" class="link">
                deno.land/std
              </a>
              .
            </li>
            <li>
              <a
                href="https://github.com/denoland/deno/wiki#companies-interested-in-deno"
                class="link"
              >
                ژمارەیەک کۆمپانیا هەن کە کار بە دێنۆ دەکەن
              </a>
              .
            </li>
          </ol>
        </div>
        <div class="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 mt-20">
          <a class="hover:underline" href="#installation">
            <h3 class="font-bold text-xl" id="installation">
              دامەزراندن
            </h3>
          </a>
          <InstallSection />
        </div>
        <div class="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 mt-20">
          <a class="hover:underline" href="#getting-started">
            <h3 class="font-bold text-xl" id="getting-started">
              دەستپێکردن
            </h3>
          </a>
          <p class="my-4 text-gray-700">پڕۆگرامێکی ساکار کار پێ بکە:</p>
          <CodeBlock
            code="deno run https://deno.land/std/examples/welcome.ts"
            language="bash"
          />
          <p class="my-4 text-gray-700">یان دانەیەکی چڕتر:</p>
        </div>
        <div class="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8">
          <CodeBlock
            code={complexExampleProgram}
            language="typescript"
            disablePrefixes
          />
        </div>
        <div class="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8">
          <p class="my-4 text-gray-700">
            دەتوانیت زۆرتر قووڵ بیتەوە و نموونەی زۆرتر ببینیت لە{" "}
            <a class="link" href="/manual">
             مانواڵەکە
            </a>
            .
          </p>
        </div>
        <div class="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 mt-20">
          <a class="hover:underline" href="#runtime-documentation">
            <h3 class="font-bold text-xl" id="runtime-documentation">
              نووسراوی ژینگە
            </h3>
          </a>
          <p class="my-4 text-gray-700">
            The basic runtime documentation for Deno can be found on{" "}
            <a href="https://doc.deno.land/deno/stable" class="link">
              doc.deno.land
            </a>
            .
          </p>
          <p class="my-4 text-gray-700">
            دێنۆ{" "}
            <a class="link" href="/manual">
              مانواڵێکی
            </a>{" "}
            هەیە کە بابەتەکان بەقووڵی باس دەکات، ڕوونکردنەوە بۆ بەشە جیاوازەکانی دێنۆ دەدات، پێت دەڵێت چۆن دێنۆ بە پڕۆژەکانتەوە بلکێنیت و چۆنیش فراوانی بکەیت بە بەکارهێنانی پێوەکراوی ڕەست.
          </p>
          <p class="my-4 text-gray-700">
            مانواڵەکە باس لە ئەو شتانەش دەکات کە دێنۆ دابینینیان دەکات.
          </p>
        </div>
        <div class="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 mt-20">
          <a class="hover:underline" href="#standard-modules">
            <h3 class="font-bold text-xl" id="standard-modules">
              کتێبخانەی ستاندارد
            </h3>
          </a>
          <p class="my-4 text-gray-700">
            پەرەپێدەرەکانی دێنۆ کار لەسەر مۆدیوڵە ستانداردەکان دەکەن کە گەرەنتیی
            کارکردنیان هەیە بە دێنۆ. سەرچاوەی مۆدیوڵە ستانداردەکان{" "}
            <a href="https://github.com/denoland/deno_std" class="link">
              لێرەیە
            </a>.
          </p>
          <p class="my-4 text-gray-700">
            مۆدڵیولە ستانداردەکان بەردەستن لە{" "}
            <a class="link" href="/std">
              deno.land/std
            </a>{" "}
            و بە بەستەرەکانیان دەتوانن بەکار بهێنرێن، وەک هەر مۆدیوڵێکی تری ES.
          </p>
        </div>
        <div class="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 mt-20">
          <a class="hover:underline" href="#third-party-modules">
            <h3 class="font-bold text-xl" id="third-party-modules">
              مۆدیوڵەکان
            </h3>
          </a>
          <p class="my-4 text-gray-700">
            دێنۆ دەتوانێت مۆدیوڵ لە هەر شوێنێکی ئینتەرنێتەوە هاوردە بکات، بۆ
            نموونە گیتهەب، ڕاژەیەکی کەسی یان CDNـەکان وەک{" "}
            <a href="https://www.skypack.dev" class="link">
              Skypack
            </a>
            ,{" "}
            <a href="https://jspm.io" class="link">
              jspm.io
            </a>
            ,{" "}
            <a href="https://www.jsdelivr.com/" class="link">
              jsDelivr
            </a>{" "}
            یان{" "}
            <a href="https://esm.sh/" class="link">
              esm.sh
            </a>
            .
          </p>
          <p class="my-4 text-gray-700">
            بۆ ئەوەی بەکارهێنانی مۆدیوڵەکانی تر ئاسان بێت، دێنۆ لەناو خۆیدا چەند کەرەستەیەکی سوودبەخشی تێدایە وەک
            {" "}
            <a class="link" href="/manual/tools/dependency_inspector">
              <InlineCode>deno info</InlineCode>
            </a>{" "}
            و{" "}
            <a class="link" href="/manual/tools/documentation_generator">
              <InlineCode>deno doc</InlineCode>
            </a>
            . deno.landـیش بەشێکی تێدایە کە نووسراوی مۆدیوڵەکانت نیشان دەدات.
            لە{" "}
            <a href="https://doc.deno.land" class="link">
              doc.deno.land
            </a>{" "}
            بەردەستە.
          </p>
          <p class="my-4 text-gray-700">
            deno.land خزمەتگوزارییەکی بڵاوکردنەوەی گشتیشی تێدایە کە لە{" "}
            <a class="link" href="/x">
              deno.land/x
            </a>
            بەردەستە.
          </p>
        </div>
        <div class="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 mt-20">
          <a class="hover:underline" href="#toolchain">
            <h3 class="font-bold text-xl" id="toolchain">
              Built-in Toolchain
            </h3>
          </a>
          <p class="my-4 text-gray-700">
            Deno comes with a robust{" "}
            <a class="link" href="/manual/tools">
              set of tools
            </a>
            , so you can spend less time searching and evaluating third party
            modules, and more time writing code and being productive. Here are a
            few examples.
          </p>
          <p class="my-4 text-gray-700">
            <a class="link" href="/manual/tools/linter">
              Lint
            </a>{" "}
            all JS/TS files in the current directory and subdirectories:
          </p>
          <p>
            <CodeBlock code={"deno lint\nChecked 54 files"} language="bash" />
          </p>
          <p class="my-4 text-gray-700">
            <a class="link" href="/manual/tools/formatter">
              Format
            </a>{" "}
            all supported files in the current directory and subdirectories:
          </p>
          <p>
            <CodeBlock code={"deno fmt\nChecked 46 files"} language="bash" />
          </p>
          <p class="my-4 text-gray-700">
            Run a{" "}
            <a class="link" href="/manual/tools/testing">
              test
            </a>
            :
          </p>
          <p>
            <CodeBlock code={denoTestExample} language="bash" />
          </p>
          <p class="my-4 text-gray-700">
            For the full list of tools and their options, see{" "}
            <a href="/manual/tools" class="link">
              here
            </a>
            .
          </p>
        </div>
        <div class="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 mt-20">
          <a class="hover:underline" href="#examples">
            <h3 class="font-bold text-xl" id="examples">
              نموونەکان
            </h3>
          </a>
          <p class="my-4 text-gray-700">
            ئەمانە هەندێک نموونەن بۆ ئەوەی هاوکار بن لە فێربوونت.
          </p>
          <ol class="mr-8 list-disc text-gray-700">
            <li>
              <a href="https://examples.deno.land/hello-world" class="link">
                سڵاو دنیا
              </a>
            </li>
            <li>
              <a href="https://examples.deno.land/import-export" class="link">
                هاوردەکردن & هەناردەکردن
              </a>
            </li>
            <li>
              <a
                href="https://examples.deno.land/dependency-management"
                class="link"
              >
                Dependency Management
              </a>
            </li>
            <li>
              <a href="https://examples.deno.land/http-requests" class="link">
                داواکاریی HTTP
              </a>
            </li>
            <li>
              <a href="https://examples.deno.land/http-server" class="link">
                ڕاژەی HTTP: سڵاو دنیا
              </a>
            </li>
          </ol>
          <p class="my-4 text-gray-700">
            بۆ نموونەی زۆرتر،{" "}
            <a class="link" href="https://examples.deno.land">
              examples.deno.land
            </a>
            .
          </p>
        </div>
        <DenoInProductionSection />
        <div class="mt-20">
          <Footer simple />
        </div>
      </div>
    </div>
  );
}

function DenoInProductionSection() {
  const companies = [{
    name: "Slack",
    logo: "slack.svg",
    url: "https://slack.com",
  }, {
    name: "Netlify",
    logo: "netlify.svg",
    url: "https://netlify.com",
  }, {
    name: "GitHub",
    logo: "github.svg",
    url: "https://github.com",
  }, {
    name: "Supabase",
    logo: "supabase.svg",
    url: "https://supabase.com",
  }];

  return (
    <div class="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 mt-20">
      <a class="hover:underline" href="#deno-in-production">
        <h3 class="font-bold text-xl" id="deno-in-production">
          Deno in Production
        </h3>
      </a>
      <ol class="pl-1 md:pl-0 md:flex flex-wrap gap-8 mt-5 list-none">
        {companies.map(({ name, logo, url }) => (
          <li class="mb-2 md:mb-0" key={url}>
            <a
              class="flex items-center gap-2 flex-nowrap opacity-70 hover:opacity-100"
              href={url}
              target="_blank"
            >
              <img
                class="w-5"
                src={`https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/${logo}`}
                alt={name}
                title={name}
              />{" "}
              <span class="font-medium text-lg">{name}</span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

function InstallSection() {
  const shell = (
    <div key="shell" class="my-4 text-gray-700">
      <p class="py-2">شێڵ (ماک، لینوکس):</p>
      <CodeBlock
        language="bash"
        code="curl -fsSL https://deno.land/install.sh | sh"
      />
    </div>
  );
  const homebrew = (
    <div key="homebrew" class="my-4 text-gray-700">
      <p class="mb-2">
        <a href="https://formulae.brew.sh/formula/deno" class="link">
          هۆمبرو
        </a>{" "}
        (ماک):
      </p>
      <CodeBlock language="bash" code="brew install deno" />
    </div>
  );
  const powershell = (
    <div key="powershell" class="my-4 text-gray-700">
      <p class="mb-2">پاوەڕشێڵ (ویندۆز):</p>
      <CodeBlock
        language="bash"
        code="iwr https://deno.land/install.ps1 -useb | iex"
      />
    </div>
  );
  const chocolatey = (
    <div key="chocolatey" class="my-4 text-gray-700">
      <p class="mb-2">
        <a href="https://chocolatey.org/packages/deno" class="link">
          چۆکۆڵاتی
        </a>{" "}
        (ویندۆز):
      </p>
      <CodeBlock language="bash" code="choco install deno" />
    </div>
  );
  const scoop = (
    <div key="scoop" class="my-4 text-gray-700">
      <p class="mb-2">
        <a href="https://scoop.sh/" class="link">
          سکووپ
        </a>{" "}
        (ویندۆز):
      </p>
      <CodeBlock language="bash" code="scoop install deno" />
    </div>
  );
  const cargo = (
    <div key="cargo" class="my-4 text-gray-700">
      <p class="py-2">
        دروستکردن و دامەزراندن لە ڕێی{" "}
        <a href="https://crates.io/crates/deno" class="link">
          کارگۆ
        </a>
        :
      </p>
      <CodeBlock language="bash" code="cargo install deno --locked" />
    </div>
  );

  return (
    <>
      <p class="my-4 text-gray-700">
        دێنۆ تەنیا یەک فایلە و لەسەر هیچ بەند نییە. دەتوانیت لە ڕێی
        دامەزرێنەرەکان دایگریت وەک لە خوارەوە باسکراوە، یان وەشانێک لە{" "}
        <a href="https://github.com/denoland/deno/releases" class="link">
          ئێرە
        </a>{" "}
        داگریت. .
      </p>
      {shell}
      {powershell}
      {homebrew}
      {chocolatey}
      {scoop}
      {cargo}
      <p class="my-4 text-gray-700">
        <a class="link" href="https://github.com/denoland/deno_install">
          deno_install
        </a>{" "}
        ببینە بۆ ڕێگەی دیکەی دامەزراندن.
      </p>
    </>
  );
}
