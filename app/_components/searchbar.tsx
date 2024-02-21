import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export const SearchBar = () => {
    return (
        <div className="flex">
            <Input></Input>
            <Button>Search</Button>
        </div>
    )
}