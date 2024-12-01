interface IActionInputType<T> {
  inputParams: T;
  shouldStoreInputState?: boolean;
  shouldStoreOutputState?: boolean;
}
