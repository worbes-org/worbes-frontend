declare namespace React {
  interface AsyncFunctionComponent<Props = object> {
    (
      props: Props,
      deprecatedLegacyContext?: unknown,
    ): Promise<AwaitedReactNode<unknown, unknown>>;
    propTypes?: WeakValidationMap<Props>;
    contextTypes?: ValidationMap<unknown>;
    defaultProps?: Partial<Props>;
    displayName?: string;
  }

  type AFC<Props = object> = AsyncFunctionComponent<Props>;
}
