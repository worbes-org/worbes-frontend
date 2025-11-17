"use client";

import {
  LinearBadge,
  LinearButton,
  LinearCard,
  LinearCategoryList,
  LinearHeading,
  LinearInput,
  LinearSeparator,
  LinearText,
} from "@/components/linear";
import type { CategorySelection } from "@/types/category";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { type FC, useState } from "react";

const ComponentsPage: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");
  const [categorySelection, setCategorySelection] =
    useState<CategorySelection | null>(null);

  return (
    <div className="min-h-screen bg-[var(--linear-bg-primary)]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Header */}
        <div className="mb-16">
          <LinearHeading level={1} className="mb-4">
            Linear Design System
          </LinearHeading>
          <LinearText variant="secondary" size="lg">
            재사용 가능한 컴포넌트 라이브러리 데모
          </LinearText>
        </div>

        {/* Buttons Section */}
        <section className="mb-16">
          <LinearHeading level={2} className="mb-6">
            Buttons
          </LinearHeading>
          <LinearCard padding="lg" className="space-y-6">
            <div className="space-y-4">
              <div>
                <LinearText variant="secondary" size="sm" className="mb-2">
                  Variants
                </LinearText>
                <div className="flex flex-wrap gap-3">
                  <LinearButton variant="primary">Primary</LinearButton>
                  <LinearButton variant="secondary">Secondary</LinearButton>
                  <LinearButton variant="ghost">Ghost</LinearButton>
                  <LinearButton variant="accent">Accent</LinearButton>
                </div>
              </div>
              <LinearSeparator />
              <div>
                <LinearText variant="secondary" size="sm" className="mb-2">
                  Sizes
                </LinearText>
                <div className="flex flex-wrap items-center gap-3">
                  <LinearButton size="sm">Small</LinearButton>
                  <LinearButton size="md">Medium</LinearButton>
                  <LinearButton size="lg">Large</LinearButton>
                </div>
              </div>
              <LinearSeparator />
              <div>
                <LinearText variant="secondary" size="sm" className="mb-2">
                  States
                </LinearText>
                <div className="flex flex-wrap gap-3">
                  <LinearButton>Normal</LinearButton>
                  <LinearButton isLoading>Loading</LinearButton>
                  <LinearButton disabled>Disabled</LinearButton>
                </div>
              </div>
            </div>
          </LinearCard>
        </section>

        {/* Inputs Section */}
        <section className="mb-16">
          <LinearHeading level={2} className="mb-6">
            Inputs
          </LinearHeading>
          <LinearCard padding="lg" className="space-y-6">
            <div className="space-y-4">
              <div>
                <LinearText variant="secondary" size="sm" className="mb-2">
                  Basic Input
                </LinearText>
                <LinearInput
                  placeholder="Enter text..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              <LinearSeparator />
              <div>
                <LinearText variant="secondary" size="sm" className="mb-2">
                  With Label & Helper Text
                </LinearText>
                <LinearInput
                  label="Email"
                  placeholder="you@example.com"
                  helperText="We'll never share your email."
                />
              </div>
              <LinearSeparator />
              <div>
                <LinearText variant="secondary" size="sm" className="mb-2">
                  With Icons
                </LinearText>
                <LinearInput
                  placeholder="Search..."
                  leftIcon={<MagnifyingGlassIcon className="size-4" />}
                />
              </div>
              <LinearSeparator />
              <div>
                <LinearText variant="secondary" size="sm" className="mb-2">
                  Error State
                </LinearText>
                <LinearInput
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  error="Password must be at least 8 characters"
                  value={inputError}
                  onChange={(e) => setInputError(e.target.value)}
                />
              </div>
              <LinearSeparator />
              <div>
                <LinearText variant="secondary" size="sm" className="mb-2">
                  Sizes
                </LinearText>
                <div className="space-y-3">
                  <LinearInput size="sm" placeholder="Small input" />
                  <LinearInput size="md" placeholder="Medium input" />
                  <LinearInput size="lg" placeholder="Large input" />
                </div>
              </div>
            </div>
          </LinearCard>
        </section>

        {/* Cards Section */}
        <section className="mb-16">
          <LinearHeading level={2} className="mb-6">
            Cards
          </LinearHeading>
          <div className="grid gap-6 md:grid-cols-3">
            <LinearCard variant="default" padding="md">
              <LinearHeading level={4} className="mb-2">
                Default Card
              </LinearHeading>
              <LinearText variant="secondary" size="sm">
                기본 카드 스타일입니다.
              </LinearText>
            </LinearCard>
            <LinearCard variant="elevated" padding="md">
              <LinearHeading level={4} className="mb-2">
                Elevated Card
              </LinearHeading>
              <LinearText variant="secondary" size="sm">
                그림자가 있는 카드입니다.
              </LinearText>
            </LinearCard>
            <LinearCard variant="outlined" padding="md">
              <LinearHeading level={4} className="mb-2">
                Outlined Card
              </LinearHeading>
              <LinearText variant="secondary" size="sm">
                테두리만 있는 카드입니다.
              </LinearText>
            </LinearCard>
          </div>
        </section>

        {/* Badges Section */}
        <section className="mb-16">
          <LinearHeading level={2} className="mb-6">
            Badges
          </LinearHeading>
          <LinearCard padding="lg" className="space-y-6">
            <div className="space-y-4">
              <div>
                <LinearText variant="secondary" size="sm" className="mb-2">
                  Variants
                </LinearText>
                <div className="flex flex-wrap gap-2">
                  <LinearBadge variant="default">Default</LinearBadge>
                  <LinearBadge variant="accent">Accent</LinearBadge>
                  <LinearBadge variant="success">Success</LinearBadge>
                  <LinearBadge variant="warning">Warning</LinearBadge>
                  <LinearBadge variant="error">Error</LinearBadge>
                  <LinearBadge variant="info">Info</LinearBadge>
                </div>
              </div>
              <LinearSeparator />
              <div>
                <LinearText variant="secondary" size="sm" className="mb-2">
                  Sizes
                </LinearText>
                <div className="flex flex-wrap items-center gap-2">
                  <LinearBadge size="sm">Small</LinearBadge>
                  <LinearBadge size="md">Medium</LinearBadge>
                </div>
              </div>
            </div>
          </LinearCard>
        </section>

        {/* Category List Section */}
        <section className="mb-16">
          <LinearHeading level={2} className="mb-6">
            Category List
          </LinearHeading>
          <div className="grid gap-6 lg:grid-cols-2">
            <LinearCard variant="default" padding="none" className="overflow-hidden">
              <div className="border-b border-[var(--linear-border-primary)] bg-[var(--linear-bg-level2)] px-4 py-3">
                <LinearHeading level={4}>Linear Style Category List</LinearHeading>
                <LinearText variant="tertiary" size="sm" className="mt-1">
                  아이템 카테고리 선택 컴포넌트
                </LinearText>
              </div>
              <div className="h-[600px] overflow-y-auto">
                <LinearCategoryList
                  value={categorySelection}
                  onChange={setCategorySelection}
                />
              </div>
              {categorySelection && (
                <div className="border-t border-[var(--linear-border-primary)] bg-[var(--linear-bg-level2)] px-4 py-3">
                  <LinearText variant="secondary" size="sm" className="mb-1">
                    선택된 카테고리:
                  </LinearText>
                  <LinearText variant="primary" size="sm" className="font-medium">
                    {categorySelection.label || "없음"}
                  </LinearText>
                  {categorySelection.classId && (
                    <LinearText variant="tertiary" size="xs" className="mt-1">
                      Class: {categorySelection.classId}
                      {categorySelection.subClassId &&
                        `, SubClass: ${categorySelection.subClassId}`}
                    </LinearText>
                  )}
                </div>
              )}
            </LinearCard>
            <LinearCard variant="elevated" padding="lg">
              <LinearHeading level={4} className="mb-4">
                사용 방법
              </LinearHeading>
              <div className="space-y-4">
                <div>
                  <LinearText variant="secondary" size="sm" className="mb-2 font-medium">
                    Features
                  </LinearText>
                  <ul className="space-y-1.5 text-sm text-[var(--linear-text-secondary)]">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--linear-accent)]" />
                      계층적 카테고리 구조 지원
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--linear-accent)]" />
                      선택 상태 시각적 표시
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--linear-accent)]" />
                      접기/펼치기 애니메이션
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--linear-accent)]" />
                      Linear 테마 스타일 적용
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--linear-accent)]" />
                      키보드 접근성 지원
                    </li>
                  </ul>
                </div>
                <LinearSeparator />
                <div>
                  <LinearText variant="secondary" size="sm" className="mb-2 font-medium">
                    Props
                  </LinearText>
                  <div className="space-y-2 text-xs text-[var(--linear-text-tertiary)]">
                    <div>
                      <code className="rounded bg-[var(--linear-bg-level2)] px-1.5 py-0.5 text-[var(--linear-text-primary)]">
                        value
                      </code>
                      : 선택된 카테고리
                    </div>
                    <div>
                      <code className="rounded bg-[var(--linear-bg-level2)] px-1.5 py-0.5 text-[var(--linear-text-primary)]">
                        onChange
                      </code>
                      : 선택 변경 핸들러
                    </div>
                    <div>
                      <code className="rounded bg-[var(--linear-bg-level2)] px-1.5 py-0.5 text-[var(--linear-text-primary)]">
                        className
                      </code>
                      : 추가 스타일
                    </div>
                  </div>
                </div>
              </div>
            </LinearCard>
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-16">
          <LinearHeading level={2} className="mb-6">
            Typography
          </LinearHeading>
          <LinearCard padding="lg" className="space-y-6">
            <div className="space-y-6">
              <div>
                <LinearText variant="secondary" size="sm" className="mb-3">
                  Headings
                </LinearText>
                <div className="space-y-2">
                  <LinearHeading level={1}>Heading 1</LinearHeading>
                  <LinearHeading level={2}>Heading 2</LinearHeading>
                  <LinearHeading level={3}>Heading 3</LinearHeading>
                  <LinearHeading level={4}>Heading 4</LinearHeading>
                  <LinearHeading level={5}>Heading 5</LinearHeading>
                  <LinearHeading level={6}>Heading 6</LinearHeading>
                </div>
              </div>
              <LinearSeparator />
              <div>
                <LinearText variant="secondary" size="sm" className="mb-3">
                  Text Variants
                </LinearText>
                <div className="space-y-2">
                  <LinearText variant="primary" size="base">
                    Primary text - Lorem ipsum dolor sit amet
                  </LinearText>
                  <LinearText variant="secondary" size="base">
                    Secondary text - Lorem ipsum dolor sit amet
                  </LinearText>
                  <LinearText variant="tertiary" size="base">
                    Tertiary text - Lorem ipsum dolor sit amet
                  </LinearText>
                  <LinearText variant="quaternary" size="base">
                    Quaternary text - Lorem ipsum dolor sit amet
                  </LinearText>
                </div>
              </div>
              <LinearSeparator />
              <div>
                <LinearText variant="secondary" size="sm" className="mb-3">
                  Text Sizes
                </LinearText>
                <div className="space-y-2">
                  <LinearText size="xs">Extra small text</LinearText>
                  <LinearText size="sm">Small text</LinearText>
                  <LinearText size="base">Base text</LinearText>
                  <LinearText size="lg">Large text</LinearText>
                </div>
              </div>
            </div>
          </LinearCard>
        </section>

        {/* Combined Example */}
        <section className="mb-16">
          <LinearHeading level={2} className="mb-6">
            Combined Example
          </LinearHeading>
          <LinearCard variant="elevated" padding="lg">
            <div className="space-y-6">
              <div>
                <LinearHeading level={3} className="mb-2">
                  Create New Project
                </LinearHeading>
                <LinearText variant="secondary" size="sm">
                  Start a new project to organize your work
                </LinearText>
              </div>
              <LinearSeparator />
              <div className="space-y-4">
                <LinearInput
                  label="Project Name"
                  placeholder="My Awesome Project"
                  helperText="Choose a descriptive name for your project"
                />
                <LinearInput
                  label="Description"
                  placeholder="What is this project about?"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <LinearBadge variant="accent">New</LinearBadge>
                  <LinearBadge variant="info">Planning</LinearBadge>
                </div>
                <div className="flex gap-3">
                  <LinearButton variant="ghost">Cancel</LinearButton>
                  <LinearButton variant="accent">Create Project</LinearButton>
                </div>
              </div>
            </div>
          </LinearCard>
        </section>
      </div>
    </div>
  );
};

export default ComponentsPage;

