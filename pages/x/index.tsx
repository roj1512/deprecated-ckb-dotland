// Copyright 2022 the Deno authors. All rights reserved. MIT license.

/** @jsx h */
/** @jsxFrag Fragment */
import {
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
import { Pagination } from "../../components/Pagination.tsx";

const PER_PAGE = 20;

export default function ThirdPartyRegistryList({ url }: PageProps) {
  const page = parseInt(url.searchParams.get("page") || "1");
  const query = url.searchParams.get("query") || "";

  const resp = useData(
    `${page} ${PER_PAGE} ${query}`,
    () => listModules(page, PER_PAGE, query),
  );
  const stats = useData("stats", getStats);

  return (
    <>
      <Head>
        <title>Third Party Modules | Deno</title>
      </Head>
      <div class="bg-gray">
        <Header subtitle="Third Party Modules" widerContent={true} />
        <div>
          <div class="max-w-screen-lg mx-auto px-4 sm:px-6 md:px-8 mt-8">
            <dt class="text-lg leading-6 font-medium text-gray-900">
              What is deno.land/x?
            </dt>
            <dd class="mt-2">
              <p class="text-base leading-6 text-gray-500">
                <span class="font-semibold">deno.land/x</span>{" "}
                is a hosting service for Deno scripts. It caches releases of
                open source modules stored on GitHub and serves them at one easy
                to remember domain.
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
                Publish a module
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
              placeholder={!resp
                ? "Search"
                : `Search through ${resp.totalCount} modules`}
              value={query}
            />
          </form>
          <div class="sm:max-w-screen-lg sm:mx-auto sm:px-6 md:px-8 pb-4 sm:pb-12">
            {resp === null
              ? (
                <div class="p-4 text-center sm:text-left text-sm leading-5 font-medium text-gray-500 truncate">
                  Failed to load modules
                </div>
              )
              : (
                <div class="bg-white sm:shadow border border-gray-200 overflow-hidden sm:rounded-md mt-4">
                  {resp.results.length == 0
                    ? (
                      <div class="p-4 text-center sm:text-left text-sm leading-5 font-medium text-gray-500">
                        No modules found. Please let us know what you're looking
                        for by{" "}
                        <a
                          class="link"
                          href="https://github.com/denoland/wanted_modules/issues"
                        >
                          opening an issue here
                        </a>.
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
                  {resp.results.length
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

                      return (
                        <Pagination
                          {...{
                            currentPage: page,
                            hasNext,
                            hasPrevious,
                            pageCount,
                            perPage: PER_PAGE,
                            response: resp,
                            query,
                          }}
                        />
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
                  چۆن مۆدیوڵەکانی ناو deno.land/x بەکار دێن؟
                  </dt>
                  <dd class="mt-2">
                    <p class="text-base leading-6 text-gray-500 break-words">
                    دەتوانیت مۆدیوڵەکان هاوردە بکەیت لە ڕێی بەستەرێکی لەم
                      شێوەیە:<InlineCode>
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
                        مۆدیوڵێک بڵاو بکەرەوە                      </a>
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
                    deno.land/x ئاگادارت دەکاتەوە کاتێک خۆی نوێترین وەشانی
                      مۆدیوڵێکت بۆ هەڵدەبژێرێت کاتێک لە کاتی هاوردەکردنی
                      مۆدیوڵێک وەشانەکەی دیاری ناکەیت. بۆ لابردنی ئەم
                      ئاگادارکردنەوەیە، تەنیا وەشانی مۆدیوڵەکە دیاری بکە.
                    </p>
                  </dd>
                </div>
                <div class="mt-12">
                  <dt class="text-lg leading-6 font-medium text-gray-900">
                  دەتوانم دەستکاریی مۆدیوڵەکانی ناو deno.land/x بکەم یان
                  </dt>
                  <dd class="mt-2">
                    <p class="text-base leading-6 text-gray-500">
                    وەشانی مۆدیوڵەکان نەگۆڕن و ناتوانرێ دەستکاری بکرێن. بەڵام
                      لەوانەیە مۆدیوڵێک لاببرێت ئەگەر لەبەر هۆکارێکی یاسایی بێت،
                      بۆ نموونە مافی لەبەرگرتنەوە.
                    </p>
                  </dd>
                </div>
                <div class="mt-12">
                  <dt class="text-lg leading-6 font-medium text-gray-900">
                    I can't find a specific module. Help!
                  </dt>
                  <dd class="mt-2">
                    <p class="text-base leading-6 text-gray-500">
                      Please let us know which one by{" "}
                      <a
                        class="link"
                        href="https://github.com/denoland/wanted_modules/issues"
                      >
                        opening an issue here
                      </a>.
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
              )
              : null}
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
                              دەربارەی نییە
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
                  <div class="mr-6 mr-4 flex items-center">
                    <div class="text-gray-400">
                      {meta.starCount}
                    </div>
                    <svg
                      class="mr-1 text-gray-400 w-5 h-5"
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
