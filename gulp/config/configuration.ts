import type webpack from "webpack";

export interface Configuration
  extends Omit<webpack.Configuration, "module" | "plugins"> {
  module: Omit<webpack.ModuleOptions, "rules"> & {
    rules: webpack.RuleSetRule[];
  };
  entry: { app: string[]; vendor: string[] };
  plugins: (
    | ((this: webpack.Compiler, compiler: webpack.Compiler) => void)
    | webpack.WebpackPluginInstance
  )[];
}
