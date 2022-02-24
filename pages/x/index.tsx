// Copyright 2022 the Deno authors. All rights reserved. MIT license.

/** @jsx h */
/** @jsxFrag Fragment */
import {
  ClassAttributes,
  emojify,
  Fragment,
  h,
  Head,
  PageProps,
  twas,
  useData,
} from "../../deps.ts";

import { Header } from "../../components/Header.tsx";
import { Footer } from "../../components/Footer.tsx";
import { InlineCode } from "../../components/InlineCode.tsx";

import { getStats, listModules } from "../../util/registry_utils.ts";
import * as pageutils from "../../util/pagination_utils.ts";
import { ComponentChildren } from "https://x.lcas.dev/preact@10.5.12/mod.d.ts";

const PER_PAGE = 20;

export default function ThirdPartyRegistryList({ url }: PageProps) {
  const page = parseInt(url.searchParams.get("page") || "1");
  const query = url.searchParams.get("query") || "";

  const resp = useData(
    `${page} ${PER_PAGE} ${query}`,
    () => listModules(page, PER_PAGE, query),
  );
  const stats = useData("stats", getStats);

  function toPage(n: number): string {
    const params = new URLSearchParams();
    if (query) {
      params.set("query", query);
    }
    params.set("page", n.toString());
    return "/x?" + params.toString();
  }

  return (
    <>
      <Head>
        <title>مۆدیوڵەکان | دێنۆ</title>
      </Head>
      <div class="bg-gray">
        <Header subtitle="Third Party Modules" widerContent={true} />
        <div>
          <div class="max-w-screen-lg mx-auto px-4 sm:px-6 md:px-8 mt-8">
            <dt class="text-lg leading-6 font-medium text-gray-900">
            deno.land/x چییە؟
            </dt>
            <dd class="mt-2">
              <p class="text-base leading-6 text-gray-500">
                <span class="font-semibold">deno.land/x</span>{" "}خزمەتگوزارییەکی بڵاوکردنەوەی گشتییە بۆ مۆدیوڵی دێنۆ. وەشانی مۆدیوڵەکان لە گیتهەبەوە دەهێنێت و لە شوێنێک دایان دەنێت کە ناوەکەی ئاسان بێت بۆ بیرهاتنەوە.
              </p>
            </dd>

            <div class="mt-2">
              <a href="#info" class="link">
                Learn more
              </a>
            </div>

            <div class="mt-6">
              <a
                href="/add_module"
                class="
                  py-2 px-8 border border-gray-300 text-md font-medium rounded-md
                  text-gray-700 bg-gray-100 hover:text-gray-500 hover:bg-gray-50
                  focus:outline-none focus:shadow-outline-blue focus:border-blue-300
                  active:bg-gray-100 active:text-gray-700 transition duration-150 ease-in-out
                "
              >
                مۆدیوڵێک بڵاو بکەرەوە
              </a>
            </div>
            {
              /* <div class="mt-8">
              <ErrorMessage title="Ongoing incident">
                We are currently seeing delays and timeouts during module publishing and search. Serving of already published modules and `std` is not affected. We are working on resolving the problem.
              <ErrorMessage />
            </div> */
            }
          </div>
          <form
            method="get"
            class="max-w-screen-lg mx-auto px-4 sm:px-6 md:px-8 mt-8"
          >
            <label htmlFor="query" class="font-medium sr-only">
              Search
            </label>
            <input
              name="query"
              id="query"
              class="block w-full px-4 py-2 leading-normal bg-white border border-gray-200 rounded-lg outline-none shadow hover:shadow-sm focus:shadow-sm appearance-none focus:border-gray-300 hover:border-gray-300 mt-1"
              type="text"
              placeholder={
                !resp ? "بگەڕێ" : `لەناو ${resp.totalCount} مۆدیوڵ بگەڕێ`
              }
              value={query}
            />
          </form>
          <div class="sm:max-w-screen-lg sm:mx-auto sm:px-6 md:px-8 pb-4 sm:pb-12">
            {resp === null
              ? (
                <div class="p-4 text-center sm:text-left text-sm leading-5 font-medium text-gray-500 truncate">
                  نەتوانرا مۆدیوڵەکان بار بکرێن
                </div>
              )
              : (
                <div class="bg-white sm:shadow border border-gray-200 overflow-hidden sm:rounded-md mt-4">
                  {resp.results.length == 0
                    ? (
                      <div class="p-4 text-center sm:text-left text-sm leading-5 font-medium text-gray-500 truncate">
                        هیچ مۆدیوڵێک نەدۆزرایەوە
                      </div>
                    )
                    : (
                      <ModuleList
                        modules={resp.results.map((v) => ({
                          ...v,
                          starCount: v.star_count,
                        }))}
                      />
                    )}
                  {!query
                    ? (() => {
                      const pageCount = pageutils.pageCount({
                        totalCount: resp.totalCount,
                        perPage: PER_PAGE,
                      });
                      const hasPrevious = pageutils.hasPrevious({ page });
                      const hasNext = pageutils.hasNext({
                        page,
                        totalCount: resp.totalCount,
                        perPage: PER_PAGE,
                      });
                      const centerPage = Math.max(
                        4,
                        Math.min(page, pageCount - 3)
                      );

                      return (
                        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                          <div class="flex-1 flex justify-between items-center sm:hidden">
                            <MaybeA
                              disabled={!hasPrevious}
                              href={toPage(page - 1)}
                              class={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md bg-white ${
                                hasPrevious
                                  ? "text-gray-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700"
                                  : "text-gray-500 cursor-default"
                              } transition ease-in-out duration-150`}
                            >
                              پێشتر
                            </MaybeA>
                            <div class="text-base leading-6 text-gray-500">
                              {page}/{pageCount}
                            </div>
                            <MaybeA
                              disabled={!hasNext}
                              href={toPage(page + 1)}
                              class={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md bg-white ml-4 ${
                                hasNext
                                  ? "text-gray-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700"
                                  : "text-gray-500 cursor-default"
                              } transition ease-in-out duration-150`}
                            >
                              دواتر
                            </MaybeA>
                          </div>
                          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                              <p class="text-sm leading-5 text-gray-700">
                                Showing{" "}
                                <span class="font-medium">
                                  {(page - 1) * PER_PAGE + 1}
                                </span>{" "}
                                to{" "}
                                <span class="font-medium">
                                  {(page - 1) * PER_PAGE + resp.results.length}
                                </span>{" "}
                                of{" "}
                                <span class="font-medium">
                                  {resp.totalCount}
                                </span>{" "}
                                ئەنجام نیشان دەدرێن
                              </p>
                            </div>
                            <div>
                              <nav class="relative z-0 inline-flex shadow-sm">
                                <MaybeA
                                  disabled={!hasPrevious}
                                  href={toPage(page - 1)}
                                  class={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium ${
                                    hasPrevious
                                      ? "text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500"
                                      : "text-gray-300 cursor-default"
                                  } transition ease-in-out duration-150`}
                                  aria-label="Previous"
                                >
                                  <svg
                                    class="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </MaybeA>
                                <a
                                  href={toPage(1)}
                                  class={`inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 text-sm leading-5 ${
                                    page === 1
                                      ? "bg-gray-100 font-semibold text-gray-800"
                                      : "bg-white font-medium text-gray-700"
                                  } hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
                                >
                                  1
                                </a>
                                {centerPage === 4
                                  ? (
                                    <>
                                      <a
                                        href={toPage(2)}
                                        class={`hidden md:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 text-sm leading-5 ${
                                          page === 2
                                            ? "bg-gray-100 font-semibold text-gray-800"
                                            : "bg-white font-medium text-gray-700"
                                        } hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
                                      >
                                        2
                                      </a>
                                      <span class="inline-flex md:hidden -ml-px relative items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700">
                                        ...
                                      </span>
                                    </>
                                  )
                                  : (
                                    <span class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700">
                                      ...
                                    </span>
                                  )}
                                <a
                                  href={toPage(centerPage - 1)}
                                  class={`hidden md:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 text-sm leading-5 ${
                                    page === centerPage - 1
                                      ? "bg-gray-100 font-semibold text-gray-800"
                                      : "bg-white font-medium text-gray-700"
                                  } hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
                                >
                                  {centerPage - 1}
                                </a>
                                <a
                                  href={toPage(centerPage)}
                                  class={`inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 text-sm leading-5 ${
                                    page === centerPage
                                      ? "bg-gray-100 font-semibold text-gray-800"
                                      : "bg-white font-medium text-gray-700"
                                  } hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
                                >
                                  {centerPage}
                                </a>
                                <a
                                  href={toPage(centerPage + 1)}
                                  class={`hidden md:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 text-sm leading-5 ${
                                    page === centerPage + 1
                                      ? "bg-gray-100 font-semibold text-gray-800"
                                      : "bg-white font-medium text-gray-700"
                                  } hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
                                >
                                  {centerPage + 1}
                                </a>
                                {centerPage === pageCount - 3
                                  ? (
                                    <>
                                      <a
                                        href={toPage(pageCount - 1)}
                                        class={`hidden md:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 text-sm leading-5 ${
                                          page === pageCount - 1
                                            ? "bg-gray-100 font-semibold text-gray-800"
                                            : "bg-white font-medium text-gray-700"
                                        } hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
                                      >
                                        {pageCount - 1}
                                      </a>
                                      <span class="inline-flex md:hidden -ml-px relative items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700">
                                        ...
                                      </span>
                                    </>
                                  )
                                  : (
                                    <span class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700">
                                      ...
                                    </span>
                                  )}
                                <a
                                  href={toPage(pageCount)}
                                  class={`inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 text-sm leading-5 ${
                                    page === pageCount
                                      ? "bg-gray-100 font-semibold text-gray-800"
                                      : "bg-white font-medium text-gray-700"
                                  } hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
                                >
                                  {pageCount}
                                </a>
                                <MaybeA
                                  href={toPage(page + 1)}
                                  disabled={!hasNext}
                                  class={`-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium ${
                                    hasNext
                                      ? "text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500"
                                      : "text-gray-300 cursor-default"
                                  } transition ease-in-out duration-150`}
                                  aria-label="Previous"
                                >
                                  <svg
                                    class="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </MaybeA>
                              </nav>
                            </div>
                          </div>
                        </div>
                      );
                    })()
                  : null}
              </div>
            )}
          </div>
          <div
            id="info"
            class="max-w-screen-xl mx-auto pt-4 pb-8 sm:pt-8 px-4 sm:px-6 lg:pt-12 lg:px-8"
          >
            <dl class="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <div>
                  <dt class="text-lg leading-6 font-medium text-gray-900">
                    How do I use modules on deno.land/x?
                  </dt>
                  <dd class="mt-2">
                    <p class="text-base leading-6 text-gray-500 break-words">
                      The basic format of code URLs is
                      <InlineCode>
                        https://deno.land/x/IDENTIFIER@VERSION/FILE_PATH
                      </InlineCode>
                      . ئەگەر ژمارەی وەشانەکە نەنووسیت، نوێترین وەشان
                      هەڵدەبژێردرێت.
                    </p>
                  </dd>
                </div>
                <div class="mt-12">
                  <dt class="text-lg leading-6 font-medium text-gray-900">
                  دەتوانم لە ڕێی مۆدیوڵەکانی ئێرە ئەرکی دێنۆ بگۆڕم؟
                  </dt>
                  <dd class="mt-2">
                    <p class="text-base leading-6 text-gray-500">
                    نا، نووسراو دەربارەی ژینگەی دێنۆ خۆی لە{" "}
                      <a class="link" href="https://doc.deno.land/">
                        ئێرە
                      </a>{" "}
                      و ناو مانواڵەکەیە.{" "}
                      <a href="/std" class="link">/std</a>{" "}
                      ببینە بۆ مۆدیوڵە ستانداردەکان.
                    </p>
                  </dd>
                </div>
                <div class="mt-12">
                  <dt class="text-lg leading-6 font-medium text-gray-900">
                  چۆن دەتوانم مۆدیوڵێکی خۆم لە deno.land/x دابنێم؟
                  </dt>
                  <dd class="mt-2">
                    <p class="text-base leading-6 text-gray-500 break-words">
                    ئەو دوگمەیەی خوارەوە بکە و ڕێنماییەکان بخوێنەوە:
                    </p>
                    <span class="block w-full rounded-md shadow-sm mt-4">
                      <a
                        href="/add_module"
                        class="w-full flex justify-center py-2 px-4 border border-gray-300 text-md font-medium rounded-md text-gray-700 bg-gray-100 hover:text-gray-500 hover:bg-gray-50 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition duration-150 ease-in-out"
                      >
                        مۆدیوڵێک بڵاو بکەرەوە
                      </a>
                    </span>
                  </dd>
                </div>
              </div>
              <div class="mt-12 md:mt-0">
                <div>
                  <dt
                    class="text-lg leading-6 font-medium text-gray-900"
                    id="warning"
                  >
                    کاتێک مۆدیوڵ لە deno.land/xـەوە هاوردە دەکەم ئاگادار
                    دەکرێمەوە!
                  </dt>
                  <dd class="mt-2">
                    <p class="text-base leading-6 text-gray-500">
                    deno.land/x ئاگادارت دەکاتەوە کاتێک خۆی نوێترین وەشانی مۆدیوڵێکت بۆ هەڵدەبژێرێت کاتێک لە کاتی هاوردەکردنی مۆدیوڵێک وەشانەکەی دیاری ناکەیت. بۆ لابردنی ئەم ئاگادارکردنەوەیە، تەنیا وەشانی مۆدیوڵەکە دیاری بکە.
                    </p>
                  </dd>
                </div>
                <div class="mt-12">
                  <dt class="text-lg leading-6 font-medium text-gray-900">
                  دەتوانم دەستکاریی مۆدیوڵەکانی ناو deno.land/x بکەم یان بیانسڕمەوە؟
                  </dt>
                  <dd class="mt-2">
                    <p class="text-base leading-6 text-gray-500">
                    وەشانی مۆدیوڵەکان نەگۆڕن و ناتوانرێ دەستکاری بکرێن. بەڵام لەوانەیە مۆدیوڵێک لاببرێت ئەگەر لەبەر هۆکارێکی یاسایی بێت، بۆ نموونە مافی لەبەرگرتنەوە.
                    </p>
                  </dd>
                </div>
              </div>
            </dl>
          </div>
          <div class="max-w-screen-lg mx-auto pt-4 pb-8 sm:pt-8 sm:pb-12 px-4 sm:px-6 lg:pt-12 lg:pb-16 lg:px-8">
            <h4 class="font-semibold text-2xl" id="stats">
              Stats
            </h4>
            {stats
              ? (
                <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <h5 class="font-medium text-lg">مۆدیوڵە نوێکان</h5>
                    <div class="bg-white sm:shadow border border-gray-200 overflow-hidden rounded-md mt-2">
                      <ModuleList
                        modules={stats.recently_added_modules.map((v) => ({
                          name: v.name,
                          description: v.description,
                          date: v.created_at,
                          starCount: v.star_count,
                        }))}
                      />
                    </div>
                  </div>
                  <div>
                    <h5 class="font-medium text-lg">دوایین نوێکردنەوە</h5>
                    <div class="bg-white sm:shadow border border-gray-200 overflow-hidden rounded-md mt-2">
                      <ModuleList
                        modules={stats.recently_uploaded_versions.map((v) => ({
                          name: v.name,
                          description: v.version,
                          date: v.created_at,
                          starCount: undefined,
                        }))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <Footer simple />
      </div>
    </>
  );
}

function ModuleList({
  modules,
}: {
  modules: Array<{
    name: string;
    description: string;
    date?: string;
    starCount?: string;
  }>;
}) {
  return (
    <ul>
      {modules.map((meta, i) => {
        const link = `/x/${meta.name}`;
        return (
          <li class={i !== 0 ? "border-t border-gray-200" : ""} key={i}>
            <a
              href={link}
              class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
            >
              <div class="flex items-center px-4 sm:px-6 py-2">
                <div class="min-w-0 flex-1 flex items-center">
                  <div class="min-w-0 flex-1">
                    <div class="text-sm leading-5 font-medium text-blue-500 truncate">
                      {meta.name}
                    </div>
                    <div class="mt-1 flex items-center text-sm leading-5 text-gray-500">
                      <span class="truncate">
                        {meta.description
                          ? emojify(meta.description)
                          : (
                            <span class="italic text-gray-400">
                              No description
                            </span>
                          )}
                      </span>
                    </div>
                    {meta.date && (
                      <div class="mt-1 flex items-center text-sm leading-5 text-gray-400">
                        <span
                          class="truncate"
                          title={new Date(meta.date).toLocaleString()}
                        >
                          <time dateTime={meta.date}>
                            {twas(new Date(meta.date))}
                          </time>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {meta.starCount !== undefined && (
                  <div class="ml-6 mr-4 flex items-center">
                    <div class="text-gray-400">
                      {meta.starCount}
                    </div>
                    <svg
                      class="ml-1 text-gray-400 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <title>
                        star
                      </title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                      </path>
                    </svg>
                  </div>
                )}
                <div>
                  <svg
                    class="h-5 w-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

//  find proper typings
// deno-lint-ignore no-explicit-any
function MaybeA({ disabled, children, ...props }: any & {
  disabled?: boolean;
  children: ComponentChildren;
}) {
  const Tag = disabled ? "div" : "a";
  return <Tag {...props}>{children}</Tag>;
}
