
import { Auth } from "../component/Auth";
import { Quote } from "../component/Quote";



export function Signup() {
   

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 text-2xl font-bold">
        <Auth buttonText="signup" />
        <div className="hidden md:block">
          <Quote></Quote>
        </div>
      </div>
    </div>
  );
}
