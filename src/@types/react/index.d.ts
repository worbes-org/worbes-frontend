declare namespace React {
  interface AsyncFunctionComponent<P = {}> {
    (
      props: P,
      deprecatedLegacyContext?: unknown
    ): Promise<AwaitedReactNode<unknown, unknown>>;
    propTypes?: WeakValidationMap<P>;
    contextTypes?: ValidationMap<unknown>;
    defaultProps?: Partial<P>;
    displayName?: string;
  }

  type AFC<P = {}> = AsyncFunctionComponent<P>;
}
