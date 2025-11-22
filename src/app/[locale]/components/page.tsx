"use client";

import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";
import {
  LinearCategoryList,
  LinearDropdown,
  type LinearDropdownOption,
  LinearHeading,
  LinearSegmentedControl,
  LinearSeparator,
} from "@/components/linear";
import Text from "@/components/Text";
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
    {
      value: "US",
      label: "United States",
      icon: <GlobeAltIcon className="size-4" />,
    },
    { value: "EU", label: "Europe", icon: <GlobeAltIcon className="size-4" /> },
  ];

  const realmOptions: LinearDropdownOption[] = [
    {
      value: "azshara",
      label: "아즈샤라",
      icon: <BuildingOfficeIcon className="size-4" />,
    },
    {
      value: "dalaran",
      label: "달라란",
      icon: <BuildingOfficeIcon className="size-4" />,
    },
    {
      value: "stormrage",
      label: "스톰레이지",
      icon: <BuildingOfficeIcon className="size-4" />,
    },
    {
      value: "arthas",
      label: "아서스",
      icon: <BuildingOfficeIcon className="size-4" />,
    },
    {
      value: "kiljaeden",
      label: "킬제덴",
      icon: <BuildingOfficeIcon className="size-4" />,
    },
  ];

  const simpleOptions: LinearDropdownOption[] = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4", disabled: true },
    { value: "option5", label: "Option 5" },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Header */}
        <div className="mb-16">
          <LinearHeading level={1} className="mb-4">
            Linear Design System
          </LinearHeading>
          <Text theme="secondary" size="lg">
            재사용 가능한 컴포넌트 라이브러리 데모
          </Text>
        </div>

        {/* Buttons Section */}
        <section className="mb-16">
          <LinearHeading level={2} className="mb-6">
            Buttons
          </LinearHeading>
          <Card theme="default" size="lg" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Text theme="secondary" size="sm" className="mb-2">
                  Variants
                </Text>
                <div className="flex flex-wrap gap-3">
                  <Button theme="primary" size="md">
                    Primary
                  </Button>
                  <Button theme="secondary" size="md">
                    Secondary
                  </Button>
                  <Button theme="tertiary" size="md">
                    Tertiary
                  </Button>
                  <Button theme="quaternary" size="md">
                    Quaternary
                  </Button>
                </div>
              </div>
              <LinearSeparator />
              <div>
                <Text theme="secondary" size="sm" className="mb-2">
                  Sizes
                </Text>
                <div className="flex flex-wrap items-center gap-3">
                  <Button theme="primary" size="sm">
                    Small
                  </Button>
                  <Button theme="primary" size="md">
                    Medium
                  </Button>
                  <Button theme="primary" size="lg">
                    Large
                  </Button>
                </div>
              </div>
              <LinearSeparator />
              <div>
                <Text theme="secondary" size="sm" className="mb-2">
                  States
                </Text>
                <div className="flex flex-wrap gap-3">
                  <Button theme="primary" size="md">
                    Normal
                  </Button>
                  <Button theme="primary" size="md" isLoading>
                    Loading
                  </Button>
                  <Button theme="primary" size="md" disabled>
                    Disabled
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Inputs Section */}
        <section className="mb-16">
          <LinearHeading level={2} className="mb-6">
            Inputs
          </LinearHeading>
          <Card theme="default" size="lg" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Text theme="secondary" size="sm" className="mb-2">
                  Basic Input
                </Text>
                <Input
                  size="md"
                  placeholder="Enter text..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              <LinearSeparator />
              <div>
                <Text theme="secondary" size="sm" className="mb-2">
                  With Label & Helper Text
                </Text>
                <Input
                  size="md"
                  label="Email"
                  placeholder="you@example.com"
                  helperText="We'll never share your email."
                />
              </div>
              <LinearSeparator />
              <div>
                <Text theme="secondary" size="sm" className="mb-2">
                  With Icons
                </Text>
                <Input
                  size="md"
                  placeholder="Search..."
                  leftIcon={<MagnifyingGlassIcon className="size-4" />}
                />
              </div>
              <LinearSeparator />
              <div>
                <Text theme="secondary" size="sm" className="mb-2">
                  Error State
                </Text>
                <Input
                  size="md"
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
                <Text theme="secondary" size="sm" className="mb-2">
                  Sizes
                </Text>
                <div className="space-y-3">
                  <Input size="sm" placeholder="Small input" />
                  <Input size="md" placeholder="Medium input" />
                  <Input size="lg" placeholder="Large input" />
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Cards Section */}
        <section className="mb-16">
          <LinearHeading level={2} className="mb-6">
            Cards
          </LinearHeading>
          <div className="grid gap-6 md:grid-cols-3">
            <Card theme="default" size="md">
              <LinearHeading level={4} className="mb-2">
                Default Card
              </LinearHeading>
              <Text theme="secondary" size="sm">
                기본 카드 스타일입니다.
              </Text>
            </Card>
            <Card theme="elevated" size="md">
              <LinearHeading level={4} className="mb-2">
                Elevated Card
              </LinearHeading>
              <Text theme="secondary" size="sm">
                그림자가 있는 카드입니다.
              </Text>
            </Card>
            <Card theme="outlined" size="md">
              <LinearHeading level={4} className="mb-2">
                Outlined Card
              </LinearHeading>
              <Text theme="secondary" size="sm">
                테두리만 있는 카드입니다.
              </Text>
            </Card>
          </div>
        </section>

        {/* Badges Section */}
        <section className="mb-16">
          <LinearHeading level={2} className="mb-6">
            Badges
          </LinearHeading>
          <Card theme="default" size="lg" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Text theme="secondary" size="sm" className="mb-2">
                  Variants
                </Text>
                <div className="flex flex-wrap gap-2">
                  <Badge theme="default" size="md">
                    Default
                  </Badge>
                  <Badge theme="accent" size="md">
                    Accent
                  </Badge>
                  <Badge theme="success" size="md">
                    Success
                  </Badge>
                  <Badge theme="warning" size="md">
                    Warning
                  </Badge>
                  <Badge theme="error" size="md">
                    Error
                  </Badge>
                  <Badge theme="info" size="md">
                    Info
                  </Badge>
                </div>
              </div>
              <LinearSeparator />
              <div>
                <Text theme="secondary" size="sm" className="mb-2">
                  Sizes
                </Text>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge theme="default" size="sm">
                    Small
                  </Badge>
                  <Badge theme="default" size="md">
                    Medium
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Category List Section */}
        <section className="mb-16">
          <LinearHeading level={2} className="mb-6">
            Category List
          </LinearHeading>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card theme="default" size="none" className="overflow-hidden">
              <div className="border-b border-[#23252a] bg-gray-800 px-4 py-3">
                <LinearHeading level={4}>
                  Linear Style Category List
                </LinearHeading>
                <Text theme="tertiary" size="sm" className="mt-1">
                  아이템 카테고리 선택 컴포넌트
                </Text>
              </div>
              <div className="h-[600px] overflow-y-auto">
                <LinearCategoryList
                  value={categorySelection}
                  onChange={setCategorySelection}
                />
              </div>
              {categorySelection && (
                <div className="border-t border-[#23252a] bg-gray-800 px-4 py-3">
                  <Text theme="secondary" size="sm" className="mb-1">
                    선택된 카테고리:
                  </Text>
                  <Text theme="primary" size="sm" className="font-medium">
                    {categorySelection.label || "없음"}
                  </Text>
                  {categorySelection.classId && (
                    <Text theme="tertiary" size="xs" className="mt-1">
                      Class: {categorySelection.classId}
                      {categorySelection.subClassId &&
                        `, SubClass: ${categorySelection.subClassId}`}
                    </Text>
                  )}
                </div>
              )}
            </Card>
            <Card theme="elevated" size="lg">
              <LinearHeading level={4} className="mb-4">
                사용 방법
              </LinearHeading>
              <div className="space-y-4">
                <div>
                  <Text
                    theme="secondary"
                    size="sm"
                    className="mb-2 font-medium"
                  >
                    Features
                  </Text>
                  <ul className="space-y-1.5 text-sm text-gray-200">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-600" />
                      계층적 카테고리 구조 지원
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-600" />
                      선택 상태 시각적 표시
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-600" />
                      접기/펼치기 애니메이션
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-600" />
                      Linear 테마 스타일 적용
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-600" />
                      키보드 접근성 지원
                    </li>
                  </ul>
                </div>
                <LinearSeparator />
                <div>
                  <Text
                    theme="secondary"
                    size="sm"
                    className="mb-2 font-medium"
                  >
                    Props
                  </Text>
                  <div className="space-y-2 text-xs text-gray-300">
                    <div>
                      <code className="rounded bg-gray-800 px-1.5 py-0.5 text-gray-100">
                        value
                      </code>
                      : 선택된 카테고리
                    </div>
                    <div>
                      <code className="rounded bg-gray-800 px-1.5 py-0.5 text-gray-100">
                        onChange
                      </code>
                      : 선택 변경 핸들러
                    </div>
                    <div>
                      <code className="rounded bg-gray-800 px-1.5 py-0.5 text-gray-100">
                        className
                      </code>
                      : 추가 스타일
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Dropdown Section */}
        <section className="mb-16">
          <LinearHeading level={2} className="mb-6">
            Dropdown
          </LinearHeading>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card theme="default" size="lg" className="space-y-6">
              <div>
                <LinearHeading level={4} className="mb-2">
                  Dropdown Menu
                </LinearHeading>
                <Text theme="tertiary" size="sm">
                  Linear 스타일의 드롭다운 메뉴 컴포넌트
                </Text>
              </div>
              <LinearSeparator />
              <div className="space-y-4">
                <div>
                  <Text theme="secondary" size="sm" className="mb-3">
                    Basic Dropdown
                  </Text>
                  <LinearDropdown
                    options={simpleOptions}
                    value={selectedSimple}
                    onChange={(value) => setSelectedSimple(value)}
                    placeholder="Select an option..."
                  />
                </div>
                <LinearSeparator />
                <div>
                  <Text theme="secondary" size="sm" className="mb-3">
                    With Icons
                  </Text>
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
                  <Text theme="secondary" size="sm" className="mb-3">
                    Searchable Dropdown
                  </Text>
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
                  <Text theme="secondary" size="sm" className="mb-3">
                    With Label & Helper Text
                  </Text>
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
                  <Text theme="secondary" size="sm" className="mb-3">
                    Sizes
                  </Text>
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
                  <Text theme="secondary" size="sm" className="mb-3">
                    States
                  </Text>
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
            </Card>
            <Card theme="elevated" size="lg">
              <LinearHeading level={4} className="mb-4">
                사용 방법
              </LinearHeading>
              <div className="space-y-4">
                <div>
                  <Text
                    theme="secondary"
                    size="sm"
                    className="mb-2 font-medium"
                  >
                    Features
                  </Text>
                  <ul className="space-y-1.5 text-sm text-gray-200">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-600" />
                      검색 가능한 드롭다운 (searchable)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-600" />
                      아이콘 지원 (leftIcon, rightIcon, option.icon)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-600" />
                      키보드 네비게이션 (Arrow keys, Enter, Escape)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-600" />
                      외부 클릭 시 자동 닫기
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-600" />
                      선택 상태 시각적 표시
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-600" />
                      커스텀 렌더링 지원 (renderOption, renderTrigger)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-600" />
                      Linear 테마 스타일 적용
                    </li>
                  </ul>
                </div>
                <LinearSeparator />
                <div>
                  <Text
                    theme="secondary"
                    size="sm"
                    className="mb-2 font-medium"
                  >
                    Props
                  </Text>
                  <div className="space-y-2 text-xs text-gray-300">
                    <div>
                      <code className="rounded bg-gray-800 px-1.5 py-0.5 text-gray-100">
                        options
                      </code>
                      : 드롭다운 옵션 배열
                    </div>
                    <div>
                      <code className="rounded bg-gray-800 px-1.5 py-0.5 text-gray-100">
                        value
                      </code>
                      : 선택된 값
                    </div>
                    <div>
                      <code className="rounded bg-gray-800 px-1.5 py-0.5 text-gray-100">
                        onChange
                      </code>
                      : 선택 변경 핸들러
                    </div>
                    <div>
                      <code className="rounded bg-gray-800 px-1.5 py-0.5 text-gray-100">
                        searchable
                      </code>
                      : 검색 기능 활성화
                    </div>
                    <div>
                      <code className="rounded bg-gray-800 px-1.5 py-0.5 text-gray-100">
                        size
                      </code>
                      : 크기 (sm, md, lg)
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Segmented Control Section */}
        <section className="mb-16">
          <LinearHeading level={2} className="mb-6">
            Segmented Control
          </LinearHeading>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card theme="default" size="lg" className="space-y-6">
              <div>
                <LinearHeading level={4} className="mb-2">
                  Region Selector
                </LinearHeading>
                <Text theme="tertiary" size="sm">
                  4개 이하의 옵션 선택에 적합한 Segmented Control
                </Text>
              </div>
              <LinearSeparator />
              <div className="space-y-6">
                <div>
                  <Text theme="secondary" size="sm" className="mb-3">
                    Region Selection (추천)
                  </Text>
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
                  <Text theme="secondary" size="sm" className="mb-3">
                    With Icons
                  </Text>
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
                  <Text theme="secondary" size="sm" className="mb-3">
                    Full Width
                  </Text>
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
                  <Text theme="secondary" size="sm" className="mb-3">
                    Sizes
                  </Text>
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
                  <Text theme="secondary" size="sm" className="mb-3">
                    States
                  </Text>
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
            </Card>
            <Card theme="elevated" size="lg">
              <LinearHeading level={4} className="mb-4">
                Region 선택 UI/UX 제안
              </LinearHeading>
              <div className="space-y-4">
                <div>
                  <Text
                    theme="secondary"
                    size="sm"
                    className="mb-2 font-medium"
                  >
                    추천: Segmented Control
                  </Text>
                  <ul className="space-y-1.5 text-sm text-gray-200">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-600" />
                      4개 이하 옵션에 최적화
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-600" />
                      선택 상태가 한눈에 보임
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-600" />
                      클릭 한 번으로 선택 가능
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-600" />
                      모바일에서도 터치하기 쉬움
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent-600" />
                      Linear 스타일과 잘 어울림
                    </li>
                  </ul>
                </div>
                <LinearSeparator />
                <div>
                  <Text
                    theme="secondary"
                    size="sm"
                    className="mb-2 font-medium"
                  >
                    현재 상황 고려
                  </Text>
                  <div className="space-y-2 text-xs text-gray-300">
                    <div>
                      • 현재는 KR만 제공 → Segmented Control로 표시하되 KR만
                      활성화
                    </div>
                    <div>• 향후 확장 시 → 추가 region 버튼 활성화</div>
                    <div>• 사용자가 현재 사용 가능한 region을 명확히 인지</div>
                  </div>
                </div>
                <LinearSeparator />
                <div>
                  <Text
                    theme="secondary"
                    size="sm"
                    className="mb-2 font-medium"
                  >
                    구현 예시
                  </Text>
                  <div className="rounded-lg bg-gray-800 p-3 text-xs text-gray-300">
                    <code className="text-gray-100">
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
            </Card>
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-16">
          <LinearHeading level={2} className="mb-6">
            Typography
          </LinearHeading>
          <Card theme="default" size="lg" className="space-y-6">
            <div className="space-y-6">
              <div>
                <Text theme="secondary" size="sm" className="mb-3">
                  Headings
                </Text>
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
                <Text theme="secondary" size="sm" className="mb-3">
                  Text Variants
                </Text>
                <div className="space-y-2">
                  <Text theme="primary" size="md">
                    Primary text - Lorem ipsum dolor sit amet
                  </Text>
                  <Text theme="secondary" size="md">
                    Secondary text - Lorem ipsum dolor sit amet
                  </Text>
                  <Text theme="tertiary" size="md">
                    Tertiary text - Lorem ipsum dolor sit amet
                  </Text>
                  <Text theme="quaternary" size="md">
                    Quaternary text - Lorem ipsum dolor sit amet
                  </Text>
                </div>
              </div>
              <LinearSeparator />
              <div>
                <Text theme="secondary" size="sm" className="mb-3">
                  Text Sizes
                </Text>
                <div className="space-y-2">
                  <Text theme="secondary" size="xs">
                    Extra small text
                  </Text>
                  <Text theme="secondary" size="sm">
                    Small text
                  </Text>
                  <Text theme="secondary" size="md">
                    Base text
                  </Text>
                  <Text theme="secondary" size="lg">
                    Large text
                  </Text>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Combined Example */}
        <section className="mb-16">
          <LinearHeading level={2} className="mb-6">
            Combined Example
          </LinearHeading>
          <Card theme="elevated" size="lg">
            <div className="space-y-6">
              <div>
                <LinearHeading level={3} className="mb-2">
                  Create New Project
                </LinearHeading>
                <Text theme="secondary" size="sm">
                  Start a new project to organize your work
                </Text>
              </div>
              <LinearSeparator />
              <div className="space-y-4">
                <Input
                  size="md"
                  label="Project Name"
                  placeholder="My Awesome Project"
                  helperText="Choose a descriptive name for your project"
                />
                <Input
                  size="md"
                  label="Description"
                  placeholder="What is this project about?"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Badge theme="accent" size="md">
                    New
                  </Badge>
                  <Badge theme="info" size="md">
                    Planning
                  </Badge>
                </div>
                <div className="flex gap-3">
                  <Button theme="secondary" size="md">
                    Cancel
                  </Button>
                  <Button theme="primary" size="md">
                    Create Project
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default ComponentsPage;
