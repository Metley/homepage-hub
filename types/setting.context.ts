export interface Setting {
  theme: string;
  navBar: boolean;
  viewStyle: string;
  sortPrefrence: SortPrefrence;
}

export type ThemePreference = "System" | "Dark" | "Light";
export type SortPrefrence =
  | "CUSTOM"
  | "ADDED - ASCENDING"
  | "ADDED - DESCENDING"
  | "NAME - ASCENDING"
  | "NAME - DESCENDING";
