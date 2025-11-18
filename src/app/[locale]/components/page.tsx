"use client";

import {
  LinearBadge,
  LinearButton,
  LinearCard,
  LinearCategoryList,
  LinearDropdown,
  type LinearDropdownOption,
  LinearHeading,
  LinearInput,
  LinearSegmentedControl,
  type LinearSegmentedControlOption,
  LinearSeparator,
  LinearText,
} from "@/components/linear";
import type { CategorySelection } from "@/types/category";
import {
  BuildingOfficeIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { type FC, useState } from "react";

const ComponentsPage: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");
  const [categorySelection, setCategorySelection] =
    useState<CategorySelection | null>(null);

  // Dropdown 데모 상태
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedRealm, setSelectedRealm] = useState<string>("");
  const [selectedSimple, setSelectedSimple] = useState<string>("");

  // Segmented Control 데모 상태
  const [selectedRegionSegmented, setSelectedRegionSegmented] =
    useState<string>("KR");

  const regionOptions: LinearDropdownOption[] = [
    { value: "KR", label: "Korea", icon: <GlobeAltIcon className="size-4" /> },
    { value: "US", label: "United States", icon: <GlobeAltIcon className="size-4" /> },
    { value: "EU", label: "Europe", icon: <GlobeAltIcon className="size-4" /> },
  ];

  const realmOptions: LinearDropdownOption[] = [
    { value: "azshara", label: "아즈샤라", icon: <BuildingOfficeIcon className="size-4" /> },
    { value: "dalaran", label: "달라란", icon: <BuildingOfficeIcon className="size-4" /> },
    { value: "stormrage", label: "스톰레이지", icon: <BuildingOfficeIcon className="size-4" /> },
    { value: "arthas", label: "아서스", icon: <BuildingOfficeIcon className="size-4" /> },
    { value: "kiljaeden", label: "킬제덴", icon: <BuildingOfficeIcon className="size-4" /> },
  ];

  const simpleOptions: LinearDropdownOption[] = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4", disabled: true },
    { value: "option5", label: "Option 5" },
  ];

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

        {/* Dropdown Section */}
        <section className="mb-16">
          <LinearHeading level={2} className="mb-6">
            Dropdown
          </LinearHeading>
          <div className="grid gap-6 lg:grid-cols-2">
            <LinearCard variant="default" padding="lg" className="space-y-6">
              <div>
                <LinearHeading level={4} className="mb-2">
                  Dropdown Menu
                </LinearHeading>
                <LinearText variant="tertiary" size="sm">
                  Linear 스타일의 드롭다운 메뉴 컴포넌트
                </LinearText>
              </div>
              <LinearSeparator />
              <div className="space-y-4">
                <div>
                  <LinearText variant="secondary" size="sm" className="mb-3">
                    Basic Dropdown
                  </LinearText>
                  <LinearDropdown
                    options={simpleOptions}
                    value={selectedSimple}
                    onChange={(value) => setSelectedSimple(value)}
                    placeholder="Select an option..."
                  />
                </div>
                <LinearSeparator />
                <div>
                  <LinearText variant="secondary" size="sm" className="mb-3">
                    With Icons
                  </LinearText>
                  <LinearDropdown
                    options={regionOptions}
                    value={selectedRegion}
                    onChange={(value) => setSelectedRegion(value)}
                    placeholder="Select region..."
                    leftIcon={<GlobeAltIcon className="size-4" />}
                  />
                </div>
                <LinearSeparator />
                <div>
                  <LinearText variant="secondary" size="sm" className="mb-3">
                    Searchable Dropdown
                  </LinearText>
                  <LinearDropdown
                    options={realmOptions}
                    value={selectedRealm}
                    onChange={(value) => setSelectedRealm(value)}
                    placeholder="Search realm..."
                    searchable
                    searchPlaceholder="서버 검색..."
                    leftIcon={<MagnifyingGlassIcon className="size-4" />}
                  />
                </div>
                <LinearSeparator />
                <div>
                  <LinearText variant="secondary" size="sm" className="mb-3">
                    With Label & Helper Text
                  </LinearText>
                  <LinearDropdown
                    label="Region"
                    options={regionOptions}
                    value={selectedRegion}
                    onChange={(value) => setSelectedRegion(value)}
                    placeholder="Select region..."
                    helperText="Choose your region"
                  />
                </div>
                <LinearSeparator />
                <div>
                  <LinearText variant="secondary" size="sm" className="mb-3">
                    Sizes
                  </LinearText>
                  <div className="space-y-3">
                    <LinearDropdown
                      size="sm"
                      options={simpleOptions.slice(0, 3)}
                      placeholder="Small dropdown"
                    />
                    <LinearDropdown
                      size="md"
                      options={simpleOptions.slice(0, 3)}
                      placeholder="Medium dropdown"
                    />
                    <LinearDropdown
                      size="lg"
                      options={simpleOptions.slice(0, 3)}
                      placeholder="Large dropdown"
                    />
                  </div>
                </div>
                <LinearSeparator />
                <div>
                  <LinearText variant="secondary" size="sm" className="mb-3">
                    States
                  </LinearText>
                  <div className="space-y-3">
                    <LinearDropdown
                      options={simpleOptions.slice(0, 3)}
                      placeholder="Disabled dropdown"
                      disabled
                    />
                    <LinearDropdown
                      options={simpleOptions.slice(0, 3)}
                      placeholder="Loading dropdown"
                      isLoading
                    />
                  </div>
                </div>
              </div>
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
                      검색 가능한 드롭다운 (searchable)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--linear-accent)]" />
                      아이콘 지원 (leftIcon, rightIcon, option.icon)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--linear-accent)]" />
                      키보드 네비게이션 (Arrow keys, Enter, Escape)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--linear-accent)]" />
                      외부 클릭 시 자동 닫기
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--linear-accent)]" />
                      선택 상태 시각적 표시
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--linear-accent)]" />
                      커스텀 렌더링 지원 (renderOption, renderTrigger)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--linear-accent)]" />
                      Linear 테마 스타일 적용
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
                        options
                      </code>
                      : 드롭다운 옵션 배열
                    </div>
                    <div>
                      <code className="rounded bg-[var(--linear-bg-level2)] px-1.5 py-0.5 text-[var(--linear-text-primary)]">
                        value
                      </code>
                      : 선택된 값
                    </div>
                    <div>
                      <code className="rounded bg-[var(--linear-bg-level2)] px-1.5 py-0.5 text-[var(--linear-text-primary)]">
                        onChange
                      </code>
                      : 선택 변경 핸들러
                    </div>
                    <div>
                      <code className="rounded bg-[var(--linear-bg-level2)] px-1.5 py-0.5 text-[var(--linear-text-primary)]">
                        searchable
                      </code>
                      : 검색 기능 활성화
                    </div>
                    <div>
                      <code className="rounded bg-[var(--linear-bg-level2)] px-1.5 py-0.5 text-[var(--linear-text-primary)]">
                        size
                      </code>
                      : 크기 (sm, md, lg)
                    </div>
                  </div>
                </div>
              </div>
            </LinearCard>
          </div>
        </section>

        {/* Segmented Control Section */}
        <section className="mb-16">
          <LinearHeading level={2} className="mb-6">
            Segmented Control
          </LinearHeading>
          <div className="grid gap-6 lg:grid-cols-2">
            <LinearCard variant="default" padding="lg" className="space-y-6">
              <div>
                <LinearHeading level={4} className="mb-2">
                  Region Selector
                </LinearHeading>
                <LinearText variant="tertiary" size="sm">
                  4개 이하의 옵션 선택에 적합한 Segmented Control
                </LinearText>
              </div>
              <LinearSeparator />
              <div className="space-y-6">
                <div>
                  <LinearText variant="secondary" size="sm" className="mb-3">
                    Region Selection (추천)
                  </LinearText>
                  <LinearSegmentedControl
                    options={[
                      { value: "KR", label: "KR" },
                      { value: "EU", label: "EU" },
                      { value: "US", label: "US" },
                      { value: "TW", label: "TW" },
                    ]}
                    value={selectedRegionSegmented}
                    onChange={setSelectedRegionSegmented}
                  />
                </div>
                <LinearSeparator />
                <div>
                  <LinearText variant="secondary" size="sm" className="mb-3">
                    With Icons
                  </LinearText>
                  <LinearSegmentedControl
                    options={[
                      {
                        value: "KR",
                        label: "Korea",
                        icon: <GlobeAltIcon className="size-4" />,
                      },
                      {
                        value: "EU",
                        label: "Europe",
                        icon: <GlobeAltIcon className="size-4" />,
                      },
                      {
                        value: "US",
                        label: "United States",
                        icon: <GlobeAltIcon className="size-4" />,
                      },
                      {
                        value: "TW",
                        label: "Taiwan",
                        icon: <GlobeAltIcon className="size-4" />,
                      },
                    ]}
                    value={selectedRegionSegmented}
                    onChange={setSelectedRegionSegmented}
                  />
                </div>
                <LinearSeparator />
                <div>
                  <LinearText variant="secondary" size="sm" className="mb-3">
                    Full Width
                  </LinearText>
                  <LinearSegmentedControl
                    options={[
                      { value: "KR", label: "KR" },
                      { value: "EU", label: "EU" },
                      { value: "US", label: "US" },
                      { value: "TW", label: "TW" },
                    ]}
                    value={selectedRegionSegmented}
                    onChange={setSelectedRegionSegmented}
                    fullWidth
                  />
                </div>
                <LinearSeparator />
                <div>
                  <LinearText variant="secondary" size="sm" className="mb-3">
                    Sizes
                  </LinearText>
                  <div className="space-y-3">
                    <LinearSegmentedControl
                      size="sm"
                      options={[
                        { value: "KR", label: "KR" },
                        { value: "EU", label: "EU" },
                      ]}
                      value={selectedRegionSegmented}
                      onChange={setSelectedRegionSegmented}
                    />
                    <LinearSegmentedControl
                      size="md"
                      options={[
                        { value: "KR", label: "KR" },
                        { value: "EU", label: "EU" },
                      ]}
                      value={selectedRegionSegmented}
                      onChange={setSelectedRegionSegmented}
                    />
                    <LinearSegmentedControl
                      size="lg"
                      options={[
                        { value: "KR", label: "KR" },
                        { value: "EU", label: "EU" },
                      ]}
                      value={selectedRegionSegmented}
                      onChange={setSelectedRegionSegmented}
                    />
                  </div>
                </div>
                <LinearSeparator />
                <div>
                  <LinearText variant="secondary" size="sm" className="mb-3">
                    States
                  </LinearText>
                  <div className="space-y-3">
                    <LinearSegmentedControl
                      options={[
                        { value: "KR", label: "KR" },
                        { value: "EU", label: "EU", disabled: true },
                        { value: "US", label: "US" },
                      ]}
                      value={selectedRegionSegmented}
                      onChange={setSelectedRegionSegmented}
                    />
                    <LinearSegmentedControl
                      options={[
                        { value: "KR", label: "KR" },
                        { value: "EU", label: "EU" },
                      ]}
                      value={selectedRegionSegmented}
                      onChange={setSelectedRegionSegmented}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </LinearCard>
            <LinearCard variant="elevated" padding="lg">
              <LinearHeading level={4} className="mb-4">
                Region 선택 UI/UX 제안
              </LinearHeading>
              <div className="space-y-4">
                <div>
                  <LinearText variant="secondary" size="sm" className="mb-2 font-medium">
                    추천: Segmented Control
                  </LinearText>
                  <ul className="space-y-1.5 text-sm text-[var(--linear-text-secondary)]">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--linear-accent)]" />
                      4개 이하 옵션에 최적화
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--linear-accent)]" />
                      선택 상태가 한눈에 보임
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--linear-accent)]" />
                      클릭 한 번으로 선택 가능
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--linear-accent)]" />
                      모바일에서도 터치하기 쉬움
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--linear-accent)]" />
                      Linear 스타일과 잘 어울림
                    </li>
                  </ul>
                </div>
                <LinearSeparator />
                <div>
                  <LinearText variant="secondary" size="sm" className="mb-2 font-medium">
                    현재 상황 고려
                  </LinearText>
                  <div className="space-y-2 text-xs text-[var(--linear-text-tertiary)]">
                    <div>
                      • 현재는 KR만 제공 → Segmented Control로 표시하되 KR만 활성화
                    </div>
                    <div>
                      • 향후 확장 시 → 추가 region 버튼 활성화
                    </div>
                    <div>
                      • 사용자가 현재 사용 가능한 region을 명확히 인지
                    </div>
                  </div>
                </div>
                <LinearSeparator />
                <div>
                  <LinearText variant="secondary" size="sm" className="mb-2 font-medium">
                    구현 예시
                  </LinearText>
                  <div className="rounded-lg bg-[var(--linear-bg-level2)] p-3 text-xs text-[var(--linear-text-tertiary)]">
                    <code className="text-[var(--linear-text-primary)]">
                      {`<LinearSegmentedControl
  options={[
    { value: "KR", label: "KR" },
    { value: "EU", label: "EU", disabled: true },
    { value: "US", label: "US", disabled: true },
    { value: "TW", label: "TW", disabled: true },
  ]}
  value={selectedRegion}
  onChange={setSelectedRegion}
/>`}
                    </code>
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

