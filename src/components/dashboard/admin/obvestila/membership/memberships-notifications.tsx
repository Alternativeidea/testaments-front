import MembershipCardsManager from './membership-cards-manager'

export default async function MembershipsNotifications() {
    return (
        <div className="w-full flex flex-col gap-y-6 items-center justify-center py-12">
            <MembershipCardsManager/>
        </div>
    )
}
