import { Registerable } from "./registerable";
import { registerAdvancedTable } from "./registerAdvancedTable";
import { registerAdvancedTableCell } from "./registerAdvancedTableCell";
import { registerAdvancedTableColumn } from "./registerAdvancedTableColumn";
import { registerAutoComplete } from "./registerAutoComplete";
import { registerAvatar } from "./registerAvatar";
import { registerButton } from "./registerButton";
import { registerCard } from "./registerCard";
import { registerConfirmation } from "./registerConfirmation";
import { registerDivider } from "./registerDivider";
import { registerDrawer } from "./registerDrawer";
import { registerDropdown } from "./registerDropdown";
import { registerDropdownItem } from "./registerDropdownItem";
import { registerForm } from "./registerForm";
import { registerFormField } from "./registerFormField";
import { registerIcon } from "./registerIcon";
import { registerInput } from "./registerInput";
import { registerLayout } from "./registerLayout";
import { registerPasswordInput } from "./registerPasswordInput";
import { registerProgress } from "./registerProgress";
import { registerRate } from "./registerRate";
import { registerSegmented } from "./registerSegmented";
import { registerSelect } from "./registerSelect";
import { registerSkeleton } from "./registerSkeleton";
import { registerSlider } from "./registerSlider";
import { registerStat } from "./registerStat";
import { registerTag } from "./registerTag";

export function registerAll(loader?: Registerable) {
  registerTag(loader);
  registerStat(loader);
  registerCard(loader);
  registerForm(loader);
  registerIcon(loader);
  registerRate(loader);
  registerInput(loader);
  registerSelect(loader);
  registerDrawer(loader);
  registerAvatar(loader);
  registerButton(loader);
  registerLayout(loader);
  registerSlider(loader);
  registerDivider(loader);
  registerDropdown(loader);
  registerSkeleton(loader);
  registerProgress(loader);
  registerSegmented(loader);
  registerFormField(loader);
  registerConfirmation(loader);
  registerAutoComplete(loader);
  registerDropdownItem(loader);
  registerPasswordInput(loader);
  registerAdvancedTable(loader);
  registerAdvancedTableCell(loader);
  registerAdvancedTableColumn(loader);
};