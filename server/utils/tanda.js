App.Utils.Tanda = {};

App.Utils.Tanda.uploadNewTanda = () => {
    var toUpload = TandaShifts.find({"state.django_has_it": false});
    var uploaded = 0;
    var attempted = 0;
    toUpload.forEach((s) => {
        uploaded += App.Utils.Django.upload(s, s._id);
        attempted++;
    });

    if (attempted === 0) {
        return "No tanda to upload";
    }

    return uploaded + " tanda shifts uploaded (out of " + attempted + " that are waiting)";
}

App.Utils.Tanda.RemovePartial = (Id) => {
    PartialTandaShifts.remove({_id: Id});
}
