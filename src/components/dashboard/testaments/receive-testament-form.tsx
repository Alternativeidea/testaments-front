import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { toast } from 'sonner'

export default function ReceiveTestamentForm({ email } : {email : string}) {
    function copyEmail(email: string): void {
        navigator.clipboard.writeText(email)
        toast.success(' Uspešno ste kopirali vaš email račun.', {
            position: 'top-center'
        })
    }
    return (
        <Card className="flex flex-col justify-start w-full h-full min-h-full border-none overflow-y-scroll no-scrollbar">
            <CardHeader className='flex justify-end bg-primary-white w-full fixed shadow-button h-[100px] pb-2'>
                <h3 className="pl-4 text-h6 font-baskerville">Prejmi testamente uporabnika</h3>
            </CardHeader>
            <CardContent className='flex flex-col gap-y-4 px-4 h-full py-0 mt-[100px]'>
                <p className='py-6 text-body-medium'>Za prejem testamentov podelite svoj email z uporabnikom ki vam jih želi poslati. Ko prejemete testamente vas bomo obvestili po e-pošti.</p>
                <label>Vaš email</label>
                <div className='group flex transition-colors items-center w-full justify-between relative border border-black hover:bg-primary-dark-gray hover:text-primary-white'>
                    <Button onClick={() => copyEmail(email)} variant='light' className='w-[90%] justify-between relative overflow-x-scroll border-none group-hover:bg-primary-dark-gray group-hover:text-primary-white'>
                        {email}
                    </Button>
                    <Icons.Copy
                        onClick={() => copyEmail(email)}
                        className='absolute w-6 h-8 text-xl bg-white right-2'/>
                </div>
            </CardContent>
        </Card>
    )
}
